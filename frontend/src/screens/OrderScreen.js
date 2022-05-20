import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "./../components/Header";
import { PayPalButton } from "react-paypal-button-v2";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../redux/actions/orderActions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import moment from "moment";
import axios from "axios";
import { ORDER_PAY_RESET } from "../redux/constants/orderConstants";
import { URL } from "../url";

const OrderScreen = ({ match }) => {
  window.scrollTo(0, 0);
  const [sdkReady, setSdkReady] = useState(false);
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.orderDetails);
  const { load, order, error } = orderDetails;
  const orderPay = useSelector((state) => state.orderPay);
  const { load: loadPay, success: successPay } = orderPay;
  const dollar = (price) => {
    return (price * 0.000042).toFixed(2);
  };
  if (!load) {
    order.itemsPrice = order.orderItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientID } = await axios.get(`${URL}/api/config/paypal`);
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (!order || successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay]);
  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };
  return (
    <>
      <Header />
      <div className="container">
        {load ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row  order-detail">
              <div className="col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0">
                <div className="row">
                  <div className="col-md-4 center">
                    <div className="alert-success order-box">
                      <i className="fas fa-user"></i>
                    </div>
                  </div>
                  <div className="col-md-8 center">
                    <h5>
                      <strong>Khách hàng</strong>
                    </h5>
                    <p>{order.user.name}</p>
                    <p>
                      <a href={`mailto:${order.user.email}`}>
                        {order.user.email}
                      </a>
                    </p>
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
                    <p>Ship tới: {order.shippingAddress.country}</p>
                    <p>Phương thức thanh toán: {order.paymentMethod}</p>
                    {order.isPaid ? (
                      <div className="bg-info p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Đã trả tiền vào {moment(order.paidAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-2 col-12">
                        <p className="text-white text-center text-sm-start">
                          Chưa trả tiền
                        </p>
                      </div>
                    )}
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
                      Địa chỉ: {order.shippingAddress.address} -{" "}
                      {order.shippingAddress.city},
                      {order.shippingAddress.postalCode}
                    </p>
                    {order.isDelivered ? (
                      <div className="bg-info p-1 col-12">
                        <p className="text-white text-center text-sm-start">
                          Đã giao vào {moment(order.deliveredAt).calendar()}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-danger p-1 col-12">
                        <p className="text-white text-center text-sm-start">
                          Chưa được giao
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row order-products justify-content-between">
              <div className="col-lg-8">
                {order.orderItems.length === 0 ? (
                  <Message variant="alert-info mt-5">
                    Your order is empty
                  </Message>
                ) : (
                  <>
                    {order.orderItems.map((item, index) => (
                      <div className="order-product row" key={item.product}>
                        <div className="col-md-3 col-6">
                          <img src={item.image} alt="product" />
                        </div>
                        <div className="col-md-5 col-6 d-flex align-items-center">
                          <Link to={`/products/${item.product}`}>
                            <h6>{item.name}</h6>
                          </Link>
                        </div>
                        <div className="mt-3 mt-md-0 col-6 col-md-2  d-flex align-items-center flex-column justify-content-center ">
                          <h4>SỐ LƯỢNG</h4>
                          <h6>{item.qty}</h6>
                        </div>
                        <div className="mt-3 mt-md-0 col-md-2 col-6 align-items-end  d-flex flex-column justify-content-center">
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
                        {order.itemsPrice.toLocaleString("vi", {
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
                        {order.shippingPrice.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Thuế</strong>
                      </td>
                      <td>
                        {order.taxPrice.toLocaleString("vi", {
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
                        {order.totalPrice.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {!order.isPaid &&
                  (order.paymentMethod === "PayPal" ? (
                    <div className="col-12">
                      {loadPay && <Loading />}
                      {!sdkReady ? (
                        <Loading />
                      ) : (
                        <PayPalButton
                          amount={dollar(order.totalPrice)}
                          onSuccess={(paymentResult) =>
                            successPaymentHandler(paymentResult)
                          }
                        />
                      )}
                    </div>
                  ) : order.paymentMethod === "Cash" ? (
                    <div className="col-12">
                      Vui lòng thanh toán khi nhận hàng
                    </div>
                  ) : (
                    ""
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default OrderScreen;
