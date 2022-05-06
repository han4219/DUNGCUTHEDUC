import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import { userRegister } from "../redux/actions/userActions";
import Header from "./../components/Header";

const Register = ({ location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { load, error, user } = useSelector((state) => state.userRegister);
  const showErr = { message: "" };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name !== "" && email !== "" && password !== "") {
      dispatch(userRegister(name, email, password));
    } else {
      showErr.message = "Không được bỏ trống!";
      console.log(showErr);
    }
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
            type="text"
            placeholder="Username"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {showErr.message && (
            <Message variant="alert-danger">{showErr.message}</Message>
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {showErr.message && (
            <Message variant="alert-danger">{showErr.message}</Message>
          )}
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {showErr.message && (
            <Message variant="alert-danger">{showErr.message}</Message>
          )}
          <button type="submit">Đăng ký</button>
          <p>
            <Link to={redirect ? `login?redirect=${redirect}` : "/login"}>
              Bạn đã có tài khoản ? <strong>Đăng nhập</strong>
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
