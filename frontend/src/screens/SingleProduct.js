import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { addReview, productDetail } from "../redux/actions/productActions";
import Loading from "../components/LoadingError/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../redux/constants/productContants";
import moment from "moment";

const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const productId = match.params.id;

  const { user } = useSelector((state) => state.userLogin);
  const ProductDetail = useSelector((state) => state.productDetail);
  const { load, error, product } = ProductDetail;
  const productReview = useSelector((state) => state.productReview);
  const {
    load: loadCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReview;
  const review = {
    rating: rating,
    comment: comment,
  };
  const handleAddReview = (e) => {
    e.preventDefault();
    dispatch(addReview(productId, review));
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}`);
  };
  const handleChangeQuantity = (e) => {
    setQty(e.target.value);
  };

  useEffect(() => {
    if (successCreateReview) {
      alert("Đánh giá của bạn đã được gửi, đang chờ admin phê duyệt!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(productDetail(productId));
  }, [productId, dispatch, successCreateReview]);
  useEffect(() => {
    return () => {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    };
  }, [dispatch]);
  return (
    <>
      <Header />
      {load ? (
        <div className="mb-3">
          <Loading />
        </div>
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <div className="container single-product">
          <div className="row">
            <div className="col-md-6">
              <div className="single-image">
                <img src={product.image} alt={product.name} />
              </div>
            </div>
            <div className="col-md-6">
              <div className="product-dtl">
                <div className="product-info">
                  <div className="product-name">{product.name}</div>
                </div>
                <p>{product.description}</p>

                <div className="product-count col-lg-7 ">
                  <div className="flex-box d-flex justify-content-between align-items-center">
                    <h6>Giá</h6>
                    <span>
                      {product.price &&
                        product.price.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                    </span>
                  </div>
                  <div className="flex-box d-flex justify-content-between align-items-center">
                    <h6>Thương hiệu</h6>
                    <span>{product.trademark}</span>
                  </div>
                  <div className="flex-box d-flex justify-content-between align-items-center">
                    <h6>Trạng thái</h6>
                    {product.quantity > 0 ? (
                      <span>Còn hàng</span>
                    ) : (
                      <span>Đã hết</span>
                    )}
                  </div>
                  <div className="flex-box d-flex justify-content-between align-items-center">
                    <h6>Đánh giá</h6>
                    <Rating
                      value={product.rating}
                      text={
                        product.numReviews
                          ? `${product.numReviews} đánh giá`
                          : "0 đánh giá"
                      }
                    />
                  </div>
                  {product.quantity > 0 ? (
                    <>
                      <div className="flex-box d-flex justify-content-between align-items-center">
                        <h6>Số lượng</h6>
                        <select value={qty} onChange={handleChangeQuantity}>
                          {[...Array(product.quantity).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </select>
                      </div>
                      <button
                        className="round-black-btn"
                        onClick={handleAddToCart}
                      >
                        Thêm vào giỏ hàng
                        <span> </span>
                        <i class="fas fa-cart-plus"></i>
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          {/* RATING */}
          <div className="row my-5">
            <div className="col-md-6">
              <h6 className="mb-3">ĐÁNH GIÁ</h6>
              {product.reviews.length === 0 ? (
                <Message variant={"alert-info mt-3"}>
                  Không có đánh giá nào
                </Message>
              ) : (
                product.reviews.map((review, index) => (
                  review.show ? (<div
                    className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded"
                    key={product._id}
                  >
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <span>{moment(review.createdAt).calendar()}</span>
                    <div className="alert alert-info mt-3">
                      {review.comment}
                    </div>
                  </div>): ("")
                ))
              )}
            </div>
            <div className="col-md-6">
              <h6>VIẾT BÀI ĐÁNH GIÁ CỦA BẠN</h6>
              <div className="my-4">
                {loadCreateReview ? <Loading /> : ""}
                {errorCreateReview ? (
                  <Message variant="alert-danger">{errorCreateReview}</Message>
                ) : (
                  ""
                )}
              </div>
              {user ? (
                <form onSubmit={handleAddReview}>
                  <div className="my-4">
                    <strong>Xếp hạng</strong>
                    <select
                      className="col-12 bg-light p-3 mt-2 border-1 rounded"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      required
                    >
                      <option value="">Chọn...</option>
                      <option value="1">1 - Tệ</option>
                      <option value="2">2 - Bình thường</option>
                      <option value="3">3 - Tốt</option>
                      <option value="4">4 - Rất tốt</option>
                      <option value="5">5 - Tuyệt vời</option>
                    </select>
                  </div>
                  <div className="my-4">
                    <strong>Nhận xét</strong>
                    <textarea
                      row="3"
                      className="col-12 bg-light p-3 mt-2 border-1 rounded"
                      value={comment}
                      required
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="my-3">
                    <button
                      className="col-12 bg-black border-0 p-3 rounded text-white"
                      disabled={loadCreateReview}
                    >
                      XÁC NHẬN
                    </button>
                  </div>
                </form>
              ) : (
                <div className="my-3">
                  <Message variant={"alert-warning"}>
                    Vui lòng{" "}
                    <Link to="/login">
                      " <strong>Đăng nhập</strong> "
                    </Link>{" "}
                    để viết nhận xét{" "}
                  </Message>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleProduct;
