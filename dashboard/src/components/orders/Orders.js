import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Orders = ({ orders }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>Tên</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Tổng</th>
                    <th scope='col'>Thanh toán</th>
                    <th scope='col'>Ngày</th>
                    <th>Tình trạng</th>
                    <th scope='col' className='text-end'>
                        Xem
                    </th>
                </tr>
            </thead>
            <tbody>
                {orders.map((order) => (
                    <tr key={order._id}>
                        <td>
                            <b>{order.user.name}</b>
                        </td>
                        <td>{order.user.email}</td>
                        <td>
                            {order.totalPrice.toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </td>
                        <td>
                            {order.isPaid ? (
                                <span className='badge rounded-pill alert-success'>
                                    Thanh toán:
                                    {moment(order.paidAt).locale('vi').format('DD/MM/YYYY')}
                                </span>
                            ) : (
                                <span className='badge rounded-pill alert-danger'>
                                    Chưa thanh toán
                                </span>
                            )}
                        </td>
                        <td>{moment(order.createdAt).format('DD/MM/YYYY')}</td>
                        <td>
                            {order.isDelivered ? (
                                <span className='badge btn-success'>Đã giao hàng</span>
                            ) : (
                                <span className='badge btn-dark'>Chưa giao hàng</span>
                            )}
                        </td>
                        <td className='d-flex justify-content-end align-item-center'>
                            <Link to={`/order/${order._id}`} className='text-success'>
                                <i className='fas fa-eye'></i>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Orders;
