import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../redux/actions/cartActions";
import Header from "./../components/Header";

const PaymentScreen = ({ history }) => {
  window.scrollTo(0, 0);

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (paymentMethod) {
      dispatch(savePaymentMethod(paymentMethod));
      history.push("/placeorder");
    }
  };
  return (
    <>
      <Header />
      <div className="container d-flex justify-content-center align-items-center login-center">
        <form
          className="Login2 col-md-8 col-lg-4 col-11"
          onSubmit={submitHandler}
        >
          <h6>CHỌN PHƯƠNG THỨC THANH TOÁN</h6>
          <div className="payment-container">
            <div className="radio-container">
              <input
                className="form-check-input"
                type="radio"
                value="PayPal"
                onChange={(e) => setPaymentMethod(e.target.value)}
                id="method"
              />
              <label className="form-check-label" htmlFor="method">
                PayPal hoặc Credit Card
              </label>
            </div>
          </div>

          <button type="submit">Tiếp tục</button>
        </form>
      </div>
    </>
  );
};

export default PaymentScreen;
