import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../redux/actions/userActions";
import Header from "./../components/Header";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";

const Login = ({ location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { load, error, user } = useSelector((state) => state.userLogin);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(email, password));
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (user) {
      history.push(redirect);
    }
  }, [history, user, redirect]);

  return (
    <>
      <Header />
      <div className="container d-flex flex-column justify-content-center align-items-center login-center">
        {error && <Message variant="alert-danger">{error}</Message>}
        {load && <Loading />}
        <form
          className="Login col-md-8 col-lg-4 col-11"
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Đăng nhập</button>
          <p>
            <Link to={redirect ? `register?redirect=${redirect}` : "/register"}>
              Tạo Tài Khoản
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
