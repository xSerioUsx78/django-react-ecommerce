import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "../../../axios/axios";
import requests from "../../../requests/requests";
import SideBarFilter from "./SideBarFilter";
import Products from "../../layout/Products";
import "../../../static/layout/css/productList.css";

const queryString = require("query-string");

const ProductList = (match) => {
  const history = useHistory();

  const parsed = queryString.parse(match.location.search);
  const pageNum = parsed.page;
  let o = parsed.o ? parsed.o : "";
  let q = parsed.q ? parsed.q : "";
  let avaible = parsed.avaible ? true : "";

  const [products, setProducts] = useState({
    count: "",
    next: "",
    page_range: [],
    previous: "",
    results: [],
    total_pages: "",
    current_page: "",
  });
  const current_page = parseInt(products.current_page);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    o: o,
    q: q,
    avaible: avaible,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `${requests.fetchProductsURL}?page=${
            pageNum ? pageNum : 1
          }&avaible=${avaible}&o=${o}&q=${q}`
        );
        setProducts(res.data);
      } catch (e) {
        console.log(e.response.data);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [pageNum, avaible, o, q]);

  const handleGetPage = (page) => {
    if (page !== current_page) {
      history.push(
        `?page=${page}&avaible=${filter.avaible}&o=${filter.o}&q=${filter.q}`
      );
    }
  };

  const handlePagination = (num) => {
    if (num === current_page) {
      return (
        <li key={num} className="page-item active">
          <span
            onClick={() => handleGetPage(num)}
            className="page-link cursor-pointer"
          >
            {num}
          </span>
        </li>
      );
    } else if (num > current_page + 3 || num < current_page + 7) {
      return (
        <li key={num} className="page-item">
          <span
            onClick={() => handleGetPage(num)}
            className="page-link cursor-pointer"
          >
            {num}
          </span>
        </li>
      );
    }
  };

  const handleFilterOnChange = (e) => {
    setLoading(true);
    if (e.target.type === "checkbox") {
      setFilter({
        ...filter,
        [e.target.name]: e.target.checked ? e.target.checked : "",
      });
      if (e.target.name === "avaible") {
        avaible = e.target.checked ? e.target.checked : "";
        q = filter.q;
        o = filter.o;
      }
    } else {
      setFilter({ ...filter, [e.target.name]: e.target.value });
      if (e.target.name === "o") {
        o = e.target.value;
        avaible = filter.avaible;
        q = filter.q;
      } else if (e.target.name === "q") {
        q = e.target.value;
        o = filter.o;
        avaible = filter.avaible;
      }
    }
    const fetchProductsByFilter = async () => {
      let params = `?avaible=${avaible}&o=${o}&q=${q}`;
      try {
        const res = await axios.get(`${requests.fetchProductsURL}${params}`);
        setProducts(res.data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };
    fetchProductsByFilter();
  };

  return (
    <div className="container-fluid mt-4">
      <div className="mb-4">
        <h4>Product list</h4>
      </div>
      <div className="row">
        <div className="col-md-3 col-sm-6 col-xs-12">
          <SideBarFilter handleFilter={handleFilterOnChange} filter={filter} />
        </div>
        <div className="col-md-9 col-sm-6 col-xs-12">
          <div className="d-flex justify-content-between align-items-center bg-light rounded p-2 border mb-4">
            <div className="ordering">
              <ul className="d-flex p-0 m-0">
                <li>
                  <label
                    className={`cursor-pointer ${filter.o === "c" && "active"}`}
                    htmlFor="cheapest"
                  >
                    Cheapest
                    <input
                      onChange={handleFilterOnChange}
                      name="o"
                      id="cheapest"
                      type="radio"
                      value="c"
                      checked={filter.o === "c"}
                    />
                  </label>
                </li>
                <li>
                  <label
                    className={`cursor-pointer ${filter.o === "e" && "active"}`}
                    htmlFor="expensive"
                  >
                    Expensive
                    <input
                      onChange={handleFilterOnChange}
                      name="o"
                      id="expensive"
                      type="radio"
                      value="e"
                      checked={filter.o === "e"}
                    />
                  </label>
                </li>
                <li>
                  <label
                    className={`cursor-pointer ${filter.o === "n" && "active"}`}
                    htmlFor="newest"
                  >
                    Newest
                    <input
                      onChange={handleFilterOnChange}
                      name="o"
                      id="newest"
                      type="radio"
                      value="n"
                      checked={filter.o === "n"}
                    />
                  </label>
                </li>
              </ul>
            </div>
            <div>
              <input
                className="form-control me-2 "
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="q"
                value={filter.q}
                onChange={handleFilterOnChange}
              />
            </div>
          </div>
          <Products
            skeletonNum={4}
            products={products.results}
            loading={loading}
            showEmpty={true}
          />
          {products.total_pages > 1 && (
            <div>
              <nav aria-label="Page navigation example">
                <ul className="pagination justify-content-center">
                  <li
                    className={`page-item ${!products.previous && "disabled"}`}
                  >
                    <span
                      onClick={() => handleGetPage(pageNum - 1)}
                      className="page-link cursor-pointer"
                      tabIndex="-1"
                      aria-disabled="true"
                    >
                      Previous
                    </span>
                  </li>
                  {products.page_range.map((num) => handlePagination(num))}
                  <li className={`page-item ${!products.next && "disabled"}`}>
                    <span
                      onClick={() => handleGetPage(current_page + 1)}
                      className="page-link cursor-pointer"
                    >
                      Next
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
