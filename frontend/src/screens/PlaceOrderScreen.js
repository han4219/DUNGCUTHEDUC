import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import Message from "./../components/LoadingError/Error";
import { ORDER_CREATE_RESET } from "../redux/constants/orderConstants";
import { createOrder } from "../redux/actions/orderActions";

const PlaceOrderScreen = ({ history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;

  cart.itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  cart.shippingPrice = cart.itemsPrice > 8000000 ? 0 : 100000;
  cart.taxPrice = cart.itemsPrice * 0.05;
  cart.totalPrice =
    Number(cart.itemsPrice) +
    Number(cart.shippingPrice) +
    Number(cart.taxPrice);
  const orderCreate = useSelector((state) => state.orderCreate);
  const { error, success, order } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, history, success, order]);
  const placeOrderHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="row  order-detail">
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row ">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i class="fas fa-user"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Khách hàng</strong>
                </h5>
                <p>{user.name}</p>
                <p>{user.email}</p>
              </div>
            </div>
          </div>
          {/* 2 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-truck-moving"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Thông tin đặt hàng</strong>
                </h5>
                <p>Ship đến: {cart.shippingAddress.country}</p>
                <p>Phương thức thanh toán: {cart.paymentMethod}</p>
              </div>
            </div>
          </div>
          {/* 3 */}
          <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
            <div className="row">
              <div className="col-md-4 center">
                <div className="alert-success order-box">
                  <i className="fas fa-map-marker-alt"></i>
                </div>
              </div>
              <div className="col-md-8 center">
                <h5>
                  <strong>Giao tới</strong>
                </h5>
                <p>
                  Địa chỉ: {cart.shippingAddress.city},{" "}
                  {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.postalCode}
                </p>
              </div>
            </div>
          </div>
        </div>
        {Number(cart.totalPrice) > 8000000 ? (
          <div className="my-3 col-12 alert-success center">
            "Dụng cụ thể dục chúng tôi free ship đối với tổng sản phẩm trên 8
            triệu đồng"
          </div>
        ) : (
          ""
        )}
        <div className="row order-products justify-content-between">
          <div className="col-lg-8">
            {cart.cartItems.length === 0 ? (
              <Message variant="alert-info mt-5">Your cart is empty</Message>
            ) : (
              <>
                {cart.cartItems.map((item, index) => (
                  <div className="order-product row" key={item.product}>
                    <div className="col-md-3 col-6">
                      <img src={item.image} alt="product" />
                    </div>
                    <div className="col-md-5 col-6 d-flex align-items-center">
                      <Link to={`/products/${item.product}`}>
                        <h6>{item.name}</h6>
                      </Link>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6  d-flex align-items-center flex-column justify-content-center ">
                      <h4>SỐ LƯỢNG</h4>
                      <h6>{item.qty}</h6>
                    </div>
                    <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center ">
                      <h4>TẠM TÍNH</h4>
                      <h6>
                        {(item.qty * item.price).toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </h6>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          {/* total */}
          <div className="col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order">
            <table className="table table-bordered">
              <tbody>
                <tr>
                  <td>
                    <strong>Sản phẩm</strong>
                  </td>
                  <td>
                    {cart.itemsPrice.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Phí ship</strong>
                  </td>
                  <td>
                    {cart.shippingPrice.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Thuế (5%)</strong>
                  </td>
                  <td>
                    {cart.taxPrice.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Tổng</strong>
                  </td>
                  <td>
                    {cart.totalPrice.toLocaleString("vi", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
            {cart.cartItems.length === 0 ? null : (
              <button type="submit" onClick={placeOrderHandler}>
                ĐẶT HÀNG
              </button>
            )}

            {error && (
              <div className="my-3 col-12">
                <Message variant="alert-danger">{error}</Message>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderScreen;
