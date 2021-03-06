import { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/actions/auth";
import Button from "../base/Button";
import "../../static/auth/css/auth.css";

const queryString = require("query-string");

const Login = (match) => {
  const parsed = queryString.parse(match.location.search);
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const handleLogin = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (login.username && login.password) {
      let data = login;
      dispatch(loginUser(data));
    }
  };

  if (auth.isAuthenticated) {
    if (parsed.next) {
      return <Redirect to={parsed.next} />;
    }
    return <Redirect to="/" />;
  }

  return (
    <div className="auth-page-wrapper">
      <div className="auth-page p-5">
        <div className="container">
          <div className="sign-in-wrapper">
            <div className="header mb-4 text-center">
              <h4>Login in Your Account</h4>
            </div>
            {error && error.message && (
              <div
                className="alert 
                          alert-danger 
                          d-flex 
                          align-items-center"
                role="alert"
              >
                <div>{error.message}</div>
              </div>
            )}
            <div className="form-wrapper">
              <form
                method="POST"
                className="row g-3"
                onSubmit={handleLoginSubmit}
              >
                <div className="col-md-12">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    onChange={handleLogin}
                    name="username"
                    type="username"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    onChange={handleLogin}
                    name="password"
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="col-12">
                  {loading ? (
                    <Button
                      className="primary"
                      text="Signing in"
                      type="button"
                      loading={true}
                    />
                  ) : (
                    <Button
                      className="primary"
                      text="Sign in"
                      type="submit"
                      loading={false}
                    />
                  )}
                </div>
                <div>
                  <small>
                    don't have an existing account?{" "}
                    <Link to="/register/">Register Here</Link>
                  </small>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
