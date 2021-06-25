import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../redux/actions/auth";
import { FaCartPlus } from "react-icons/fa";
import axios from "../../axios/axios";
import requests from "../../requests/requests";
import "../../static/layout/css/navBar.css";

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const history = useHistory();

  const [searchResults, setSearchResults] = useState([]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const styles = {
    nav: {
      backgroundColor: "#e3f2fd",
    },
    pointer: {
      cursor: "pointer",
    },
  };

  const handleSearchInputChange = (e) => {
    let q = e.target.value;
    if (q !== "") {
      let param = `?q=${q}`;
      const fetchProducts = async () => {
        try {
          const res = await axios.get(`${requests.searchProductsURL}${param}`);
          setSearchResults(res.data);
        } catch (e) {
          console.log(e);
        }
      };
      fetchProducts();
      return;
    }
    setSearchResults([]);
  };

  const handleProductClick = (id, slug) => {
    history.push(`/product/${id}/${slug}/`);
    setSearchResults([]);
  };

  return (
    <div className="nav-navtop">
      <nav
        className="navbar navbar-light navbar navbar-expand-lg"
        style={styles.nav}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Django x React Ecommerce
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {auth.isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link position-relative" to="/cart/">
                      <FaCartPlus size="20px" />
                      {cart.count > 0 && (
                        <span
                          className="
                        badge 
                        bg-danger 
                        rounded-circle 
                        position-absolute 
                        translate-middle
                        border 
                        border-light
                        "
                        >
                          {cart.count}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <span
                      onClick={handleLogout}
                      className="nav-link"
                      style={styles.pointer}
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login/">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register/">
                      Register
                    </Link>
                  </li>
                </>
              )}
              <li className="nav-item">
                <Link className="nav-link" to="/product/">
                  Product list
                </Link>
              </li>
            </ul>
            <div className="d-flex posotion-relative">
              <input
                name="q"
                onChange={handleSearchInputChange}
                className="form-control"
                type="search"
                placeholder="Search"
                aria-label="Search"
                autoComplete="off"
              />
              {searchResults.length > 0 && (
                <div className="position-absolute border bg-light rounded search-result">
                  {searchResults.map((obj) => (
                    <div
                      key={obj.id}
                      className="d-flex align-items-center mb-2 cursor-pointer"
                      onClick={() => handleProductClick(obj.id, obj.slug)}
                    >
                      <img
                        className="img-50 me-2"
                        src={obj.image}
                        alt={obj.title}
                      />
                      <span>{obj.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
