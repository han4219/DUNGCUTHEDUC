import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "./../redux/actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  window.scrollTo(0, 0);
  const dispatch = useDispatch();
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const { cartItems } = useSelector((state) => state.cart);
  const totalPrice = cartItems.reduce((a, i) => a + i.qty * i.price, 0);

  const handleCheckout = (e) => {
    e.preventDefault();
    history.push("/login?rederect=shipping");
  };

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  return (
    <>
      <Header />
      {/* Cart */}
      <div className="container">
        {cartItems.length === 0 ? (
          <div className=" alert alert-info text-center mt-3">
            Giỏ hàng trống
            <Link
              className="btn btn-success mx-5 px-5 py-3"
              to="/"
              style={{
                fontSize: "15px",
              }}
            >
              Mua ngay
            </Link>
          </div>
        ) : (
          <>
            <div className=" alert alert-info text-center mt-3">
              Tổng số sản phẩm trong giỏ hàng
              <Link className="text-success mx-2" to="/cart">
                ({cartItems.length})
              </Link>
            </div>
            {/* cartiterm */}
            {cartItems.map((item) => (
              <>
                <div className="cart-iterm row">
                  <div
                    onClick={() => handleRemoveFromCart(item.product)}
                    className="remove-button d-flex justify-content-center align-items-center"
                  >
                    <i className="fas fa-times"></i>
                  </div>
                  <div className="cart-image col-md-3">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-text col-md-5 d-flex align-items-center">
                    <Link to={`/products/${item.product}`}>
                      <h4>{item.name}</h4>
                    </Link>
                  </div>
                  <div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
                    <h6>Số lượng</h6>
                    <select
                      value={item.qty}
                      onChange={(e) => {
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        );
                      }}
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
                    <h6>Tạm tính</h6>
                    <h4>
                      {(item.price * item.qty).toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </h4>
                  </div>
                </div>
              </>
            ))}

            {/* End of cart iterms */}
            <div className="total">
              <span className="sub">Tổng tiền:</span>
              <span className="total-price">
                {totalPrice.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </div>
            <hr />
            <div className="cart-buttons d-flex align-items-center row">
              <Link to="/" className="col-md-6 ">
                <button>
                  <i class="far fa-arrow-left"></i>
                  <span> </span>Tiếp tục mua sắm
                </button>
              </Link>
              {totalPrice > 0 && (
                <div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
                  <button onClick={handleCheckout}>
                    <Link to="/shipping" className="text-white">
                      Thanh toán <span> </span>{" "}
                      <i class="fal fa-credit-card"></i>
                    </Link>
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CartScreen;
