import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pagination.css";

export default function Pagination() {
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const products = await fetch("https://dummyjson.com/products?limit=150");
    const productsData = await products.json();
    // console.log(productsData.products, "products");
    setProductList(productsData.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (productList.length === 0) return;

    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentPage]);

  const totalPages = productList.length;
  const productsPerPage = 15;
  const noOfPages = Math.ceil(totalPages / productsPerPage);
  const startPage = (currentPage - 1) * productsPerPage;
  const endPage = startPage + productsPerPage;
  
  return (
    <div>
      <div className="App">
        <h1>Pagination</h1>
      </div>
      <div className="page-container">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          style={{ cursor: "pointer", fontSize: "30px" }}
          disabled={currentPage === 1}
        >
          ◀️
        </button>
        {[...Array(noOfPages)].map((page, index) => (
          <button
            key={index}
            className={`page-box ${index === currentPage - 1 ? "active" : ""}`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          style={{ cursor: "pointer", fontSize: "30px" }}
          disabled={currentPage === noOfPages}
        >
          ▶️
        </button>
      </div>
      {loading ? (
        <div className="loader-container">
          <img
            src="https://i.gifer.com/ZKZg.gif"
            alt="Loading..."
            className="loader"
          />
        </div>
      ) : (
        <div className="products-container">
          {productList.slice(startPage, endPage).map((item, index) => (
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
      )}
    </div>
  );
}
