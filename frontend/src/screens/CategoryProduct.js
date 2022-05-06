import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";
import Navbar from "../components/Navbar/Navbar";
import Rating from "../components/homeComponents/Rating";
import { getProductByCategory } from "../redux/actions/categoryActions";

const CategoryProduct = ({ match }) => {
  const dispatch = useDispatch();
  const categoryId = match.params.id;
  const categoryProductList = useSelector((state) => state.categoryListProduct);
  const { load, error, products } = categoryProductList;
  useEffect(() => {
    dispatch(getProductByCategory(categoryId));
  }, [dispatch, categoryId]);
  return (
    <>
      <Header />
      <Navbar />

      <div className="container">
        <div className="section">
          <div className="row">
            <div className="mb-4">
              <img
                src="https://res.cloudinary.com/di404qols/image/upload/v1651744234/banner/banner-dung-cu-the-duc_fdy4xt.jpg"
                alt=""
                className="d-block w-100"
              ></img>
            </div>
            <div className="col-lg-12 col-md-12 article">
              <div className="shopcontainer row">
                {load ? (
                  <div className="mb-3">
                    <Loading />
                  </div>
                ) : error ? (
                  <Message variant="alert-danger">{error}</Message>
                ) : (
                  products.map((product) => (
                    <div
                      className="shop col-lg-4 col-md-6 col-sm-6"
                      key={product._id}
                    >
                      <div className="border-product">
                        <Link to={`/products/${product._id}`}>
                          <div className="shopBack">
                            <img src={product.image} alt={product.name} />
                          </div>
                        </Link>

                        <div className="shoptext">
                          <p>
                            <Link to={`/products/${product._id}`}>
                              {product.name}
                            </Link>
                          </p>

                          <Rating
                            value={product.rating}
                            text={`${product.numReviews} đánh giá`}
                          />
                          <h3 className="price-style">
                            {product.price.toLocaleString("vi", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryProduct;
