import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Pagination from "./pagination";
import { useDispatch, useSelector } from "react-redux";
import { listProduct } from "../../redux/actions/productActions";
import Loading from "../LoadingError/Loading";
import Message from "../LoadingError/Error";

const ShopSection = ({ keyword, pageNumber }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { load, error, products, page, pages } = productList;
  useEffect(() => {
    dispatch(listProduct(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <div className="container">
        <div className="section">
          <div className="row">
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
                {/* Pagination */}
                <Pagination
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ""}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopSection;
