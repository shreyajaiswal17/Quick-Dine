import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItemSimple.jsx";
import "./Recommendations.css";

const Recommendations = () => {
  const { token, url } = useContext(StoreContext);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const loadRecommendations = async () => {
      if (!token) {
        setRecommendations([]);
        return;
      }

      try {
        const response = await axios.get(`${url}/api/recommendation`, {
          withCredentials: true,
        });

        if (!isMounted) {
          return;
        }

        if (response.data?.success && Array.isArray(response.data.recommendations)) {
          setRecommendations(response.data.recommendations);
          return;
        }

        setRecommendations([]);
      } catch (error) {
        if (isMounted) {
          setRecommendations([]);
        }
      }
    };

    loadRecommendations();

    return () => {
      isMounted = false;
    };
  }, [token, url]);

  if (!token || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="recommendations" aria-labelledby="recommendations-title">
      <div className="recommendations-head">
        <div>
          <p className="recommendations-label">FOR YOU</p>
          <h2 id="recommendations-title">Recommended For You</h2>
          <p className="recommendations-copy">
            Based on what you order and explore most often.
          </p>
        </div>
      </div>

      <div className="recommendations-track">
        {recommendations.map((item) => (
          <div className="recommendations-card" key={item._id}>
            <FoodItem
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;