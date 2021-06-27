import { useState, useEffect } from "react";
import requests from "../../requests/requests";
import axios from "../../axios/axios";
import Slider from "./Slider";
import Products from "./Products";

const Index = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLaoding] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(requests.getLatestProductsURL);
        setProducts(res.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLaoding(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <Slider />
      <div className="products-list">
        <div className="container">
          <div className="text-center mb-4">
            <h4>The latest products</h4>
          </div>
          <Products skeletonNum={4} products={products} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Index;
