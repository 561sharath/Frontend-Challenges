import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./infinateScroll.css";

export default function InfinateScroll() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${(currentPage - 1) * 10}`
    );
    const data = await res.json();
    setProductList((prev) => [...prev, ...data.products]);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 10;
      if (bottom && !loading) {
        setCurrentPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="back" onClick={goToHome}>
        🔙Back
      </div>
      <div className="App">
        <h1>Infinate Scroll</h1>
      </div>

      <div className="products-container">
        {productList.map((item, index) => (
          <div className="product-box" key={index}>
            <img
              src={item.images[0]}
              alt={item.title}
              className="image-items"
            />
            <div>Title : {item.title}</div>
            <div>Price : {item.price}</div>
          </div>
        ))}
      </div>
      {loading && (
        <div className="App loading-text">
          Loading More Products, Please Wait......
        </div>
      )}
    </div>
  );
}
