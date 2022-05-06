import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
const Orders = ({ orders, load, error }) => {
  return (
    <div className=" d-flex justify-content-center align-items-center flex-column">
      {load ? (
        <Loading />
      ) : error ? (
        <Message variant="alert-danger">{error}</Message>
      ) : (
        <>
          {orders.length === 0 ? (
            <div className="col-12 alert alert-info text-center mt-3">
              Không có đơn hàng
              <Link
                className="btn btn-success mx-2 px-3 py-2"
                to="/"
                style={{
                  fontSize: "12px",
                }}
              >
                BẮT ĐẦU MUA NGAY
              </Link>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>TRẠNG THÁI</th>
                    <th>NGÀY THÁNG</th>
                    <th>TỔNG</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((item, index) => (
                    <tr
                      className={item.isPaid ? "alert-success" : "alert-danger"}
                      key={item._id}
                    >
                      <td>
                        <a href={`/order/${item._id}`} className="link">
                          {item._id}
                        </a>
                      </td>
                      <td>
                        {item.isPaid ? (
                          <span>Đã thanh toán</span>
                        ) : (
                          <span>Chưa thanh toán</span>
                        )}
                      </td>
                      <td>
                        {item.isPaid
                          ? moment(item.paidAt).calendar()
                          : moment(item.createdAt).calendar()}
                      </td>
                      <td>
                        {item.totalPrice.toLocaleString("vi", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;
