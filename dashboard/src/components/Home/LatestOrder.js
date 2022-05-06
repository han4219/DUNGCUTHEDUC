import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../../components/LoadingError/Loading';
import Message from '../../components/LoadingError/Error';
import moment from 'moment';

const LatestOrder = ({ load, error, orders }) => {
    return (
        <div className='card-body'>
            <h1 className='card-title text-success'>Đơn đặt hàng mới</h1>
            {load ? (
                <Loading />
            ) : error ? (
                <Message variant='alert-danger'>{error}</Message>
            ) : (
                <div className='table-responsive'>
                    <table className='table'>
                        <tbody>
                            {orders.slice(0, 4).map((order, index) => (
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
                                                Thanh toán:{' '}
                                                {moment(order.paidAt).format('DD/MM/YY - HH:MM')}
                                            </span>
                                        ) : (
                                            <span className='badge rounded-pill alert-danger'>
                                                chưa thanh toán
                                            </span>
                                        )}
                                    </td>
                                    <td>{moment(order.createdAt).locale('vi').calendar()}</td>
                                    <td className='d-flex justify-content-end align-item-center'>
                                        <Link to={`/order/${order._id}`} className='text-success'>
                                            <i className='fas fa-eye'></i>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default LatestOrder;
