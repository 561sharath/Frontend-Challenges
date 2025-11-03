import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./autoCompleteSearch.css";

export default function AutoCompleteSearch() {
  const [textData, setTextData] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [hightLightedText, setHighLightedText] = useState(-1);
  const [showSearchData, setShowSearchData] = useState(true);

  const fetchData = async () => {
    const data = await fetch(
      `https://dummyjson.com/recipes/search?q=${textData}`
    );
    const recipeData = await data.json();
    // console.log(recipeData, "recipeData");
    setSearchData(recipeData.recipes);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (textData.trim().length > 0) {
        fetchData();
      } else {
        setSearchData([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [textData]);

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      setHighLightedText((prev) =>
        prev < searchData.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      setHighLightedText((prev) =>
        prev > 0 ? prev - 1 : searchData.length - 1
      );
    } else if (e.key === "Enter" && hightLightedText >= 0) {
      setTextData(searchData[hightLightedText].name);
      setSearchData([]);
      setHighLightedText(-1);
    }
  };
  return (
    <div>
      <h1 className="App">Auto Complete Search</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Search for a recipe"
          className="input-search"
          value={
            hightLightedText >= 0
              ? searchData[hightLightedText]?.name
              : textData
          }
          onChange={(e) => {
            setTextData(e.target.value);
            setHighLightedText(-1);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSearchData(true)}
          onBlur={() => setShowSearchData(false)}
        />
      </div>
      {searchData.length > 0 && showSearchData && (
        <div className="search-container">
          {searchData.map((item, index) => (
            <div
              key={index}
              onMouseDown={() => {
                setTextData(item.name);
                setSearchData([]);
                setHighLightedText(-1);
              }}
              className={`search-item ${
                hightLightedText === index ? "highlight" : ""
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
