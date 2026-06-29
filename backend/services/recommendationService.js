import foodModel from "../models/foodModel.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const RESULT_LIMIT = 8;

const STOP_WORDS = new Set([
    "and",
    "with",
    "the",
    "a",
    "an",
    "of",
    "to",
    "in",
    "for",
    "on",
    "by",
    "at",
    "food",
    "dish",
    "meal",
    "special",
]);

const FOOD_PROJECTION = "_id name description category price image";

const tokenizeName = (name = "") => {
    return name
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .map((token) => token.trim())
        .filter((token) => token.length > 2 && !STOP_WORDS.has(token));
};

const incrementMap = (map, key, amount = 1) => {
    if (!key) {
        return;
    }

    const nextValue = (map.get(key) || 0) + amount;
    map.set(key, nextValue);
};

const toItemId = (item) => {
    if (!item) {
        return "";
    }

    return String(item._id || item.id || "");
};

const buildOrderProfiles = (orders) => {
    const foodFrequency = new Map();
    const categoryFrequency = new Map();
    const keywordFrequency = new Map();
    const latestCategorySet = new Set();
    const latestFoodIds = new Set();

    let totalPrice = 0;
    let totalQuantity = 0;

    const latestOrder = orders[orders.length - 1];

    for (const order of orders) {
        for (const item of order.items || []) {
            const weight = Number(item.quantity || 1);
            const itemId = toItemId(item);

            totalPrice += Number(item.price || 0) * weight;
            totalQuantity += weight;

            incrementMap(foodFrequency, itemId, weight);
            incrementMap(categoryFrequency, item.category, weight);

            for (const token of tokenizeName(item.name)) {
                incrementMap(keywordFrequency, token, weight);
            }
        }
    }

    for (const item of latestOrder?.items || []) {
        if (item.category) {
            latestCategorySet.add(item.category);
        }
        const itemId = toItemId(item);
        if (itemId) {
            latestFoodIds.add(itemId);
        }
    }

    return {
        foodFrequency,
        categoryFrequency,
        keywordFrequency,
        latestCategorySet,
        latestFoodIds,
        averagePrice: totalQuantity > 0 ? totalPrice / totalQuantity : 0,
    };
};

const getGlobalPopularityMap = async () => {
    // Aggregate once at the database level to avoid counting food frequencies order-by-order.
    const popularity = await orderModel.aggregate([
        {
            $match: {
                payment: true,
            },
        },
        {
            $unwind: "$items",
        },
        {
            $group: {
                _id: "$items._id",
                count: {
                    $sum: {
                        $ifNull: ["$items.quantity", 1],
                    },
                },
            },
        },
        {
            $sort: {
                count: -1,
            },
        },
    ]);

    return new Map(
        popularity
            .filter((entry) => entry._id)
            .map((entry) => [String(entry._id), entry.count])
    );
};

const buildTrendingFoods = (foods, popularityMap, excludedIds = new Set()) => {
    return foods
        .filter((food) => !excludedIds.has(String(food._id)))
        .sort((left, right) => {
            const rightPopularity = popularityMap.get(String(right._id)) || 0;
            const leftPopularity = popularityMap.get(String(left._id)) || 0;

            if (rightPopularity !== leftPopularity) {
                return rightPopularity - leftPopularity;
            }

            return left.price - right.price;
        })
        .slice(0, RESULT_LIMIT);
};

const scoreFood = (food, profile, popularityMap) => {
    const foodId = String(food._id);
    let score = 0;

    const categoryFrequency = profile.categoryFrequency.get(food.category) || 0;
    const foodFrequency = profile.foodFrequency.get(foodId) || 0;
    const foodTokens = tokenizeName(food.name);
    const keywordMatches = foodTokens.filter((token) =>
        profile.keywordFrequency.has(token)
    ).length;

    // Weighted recommendations:
    // - strong category affinity
    // - repeated item affinity
    // - keyword overlap from ordered food names
    // - recent category signal
    // - affordable options get a small boost
    if (categoryFrequency > 0) {
        score += 5;
    }

    if (foodFrequency > 0) {
        score += 3;
    }

    if (keywordMatches > 0) {
        score += 2;
    }

    if (profile.latestCategorySet.has(food.category)) {
        score += 2;
    }

    if (profile.averagePrice > 0 && Number(food.price) <= profile.averagePrice) {
        score += 1;
    }

    // Popularity is used as a tie-breaker so the section still feels useful when
    // several foods receive the same personalized score.
    score += Math.min(2, (popularityMap.get(foodId) || 0) / 25);

    return score;
};

const getRecommendationsForUser = async (userId) => {
    const [user, orders, foods, popularityMap] = await Promise.all([
        userModel.findById(userId).select("cartData").lean(),
        orderModel
            .find({ userId, payment: true })
            .sort({ date: 1 })
            .select("items date payment")
            .lean(),
        foodModel.find({}).select(FOOD_PROJECTION).lean(),
        getGlobalPopularityMap(),
    ]);

    if (!user || foods.length === 0) {
        return {
            personalized: false,
            recommendations: [],
        };
    }

    const cartIds = new Set(
        Object.entries(user.cartData || {})
            .filter(([, quantity]) => Number(quantity) > 0)
            .map(([itemId]) => String(itemId))
    );

    if (orders.length === 0) {
        return {
            personalized: false,
            recommendations: buildTrendingFoods(foods, popularityMap, cartIds),
        };
    }

    const profiles = buildOrderProfiles(orders);
    const excludedIds = new Set([
        ...cartIds,
        ...profiles.latestFoodIds,
    ]);

    const rankedFoods = foods
        .filter((food) => !excludedIds.has(String(food._id)))
        .map((food) => ({
            ...food,
            _score: scoreFood(food, profiles, popularityMap),
            _popularity: popularityMap.get(String(food._id)) || 0,
        }))
        .sort((left, right) => {
            if (right._score !== left._score) {
                return right._score - left._score;
            }

            if (right._popularity !== left._popularity) {
                return right._popularity - left._popularity;
            }

            return left.price - right.price;
        })
        .slice(0, RESULT_LIMIT)
        .map(({ _score, _popularity, ...food }) => food);

    return {
        personalized: true,
        recommendations: rankedFoods,
    };
};

export default {
    getRecommendationsForUser,
};