import { useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./AISearch.css";

const AISearch = ({ onResults }) => {
  const { url } = useContext(StoreContext);

  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      onResults(null);
      setError("");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${url}/api/food/ai-search`,
        { query: trimmedQuery }
      );

      onResults(response.data.data);
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          "AI search is unavailable. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setError("");
    onResults(null);
  };

  return (
    <section
      className="ai-search"
      aria-labelledby="ai-search-title"
    >
      <div>
        <span className="ai-search-label">AI SEARCH</span>

        <h2 id="ai-search-title">
          What are you craving?
        </h2>

        <p>
          Try “spicy veg food under ₹300” or
          “something healthy”.
        </p>
      </div>

      <form
        className="ai-search-form"
        onSubmit={handleSubmit}
      >
        <div className="ai-search-input-row">
          <input
            type="search"
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Describe the food you want..."
            aria-label="AI food search"
            maxLength={300}
          />

          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Find food"}
          </button>

          {query && (
            <button
              type="button"
              className="ai-search-clear"
              onClick={clearSearch}
            >
              Clear
            </button>
          )}
        </div>

        {error && (
          <p className="ai-search-error" role="alert">
            {error}
          </p>
        )}
      </form>
    </section>
  );
};

export default AISearch;