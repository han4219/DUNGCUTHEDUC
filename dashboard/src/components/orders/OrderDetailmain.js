import React, { useEffect } from 'react';
import OrderDetailProducts from './OrderDetailProducts';
import OrderDetailInfo from './OrderDetailInfo';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deliverOrder, getOrderDetail } from '../../redux/actions/orderActions';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import moment from 'moment';

const OrderDetailmain = ({ orderID }) => {
    const dispatch = useDispatch();

    const orderDetail = useSelector((state) => state.orderDetail);
    const { load, error, order } = orderDetail;

    const orderDelivered = useSelector((state) => state.orderDelivered);
    const { load: loadDelivered, success: successDelivered } = orderDelivered;

    useEffect(() => {
        dispatch(getOrderDetail(orderID));
    }, [dispatch, orderID, successDelivered]);

    const handleDelivered = () => {
        dispatch(deliverOrder(order));
    };
    return (
        <section className='content-main'>
            <div className='content-header'>
                <Link to='/orders' className='btn btn-dark text-white'>
                    Quay lại danh sách đơn hàng
                </Link>
            </div>
            {load ? (
                <Loading />
            ) : error ? (
                <Message variant='alert-dagner'>{error}</Message>
            ) : (
                <div className='card'>
                    <header className='card-header p-3 Header-green'>
                        <div className='row align-items-center '>
                            <div className='col-lg-6 col-md-6'>
                                <span>
                                    <i className='far fa-calendar-alt mx-2'></i>
                                    <b className='text-white'>
                                        {moment(order.createdAt).locale('vi').format('llll')}
                                    </b>
                                </span>
                                <br />
                                <small className='text-white mx-3 '>Mã đơn hàng: {order._id}</small>
                            </div>
                            <div className='col-lg-6 col-md-6 ms-auto d-flex justify-content-end align-items-center'>
                                <select
                                    className='form-select d-inline-block'
                                    style={{ maxWidth: '200px' }}
                                >
                                    <option>Trạng thái</option>
                                    <option>Chờ thanh toán</option>
                                    <option>Đã xác nhận</option>
                                    <option>Đã vận chuyển</option>
                                    <option>Đã giao hàng</option>
                                </select>
                                <Link className='btn btn-success ms-2' to='#'>
                                    <i className='fas fa-print'></i>
                                </Link>
                            </div>
                        </div>
                    </header>
                    <div className='card-body'>
                        {/* Order info */}
                        <OrderDetailInfo order={order} />

                        <div className='row'>
                            <div className='col-lg-9'>
                                <div className='table-responsive'>
                                    <OrderDetailProducts order={order} load={load} />
                                </div>
                            </div>
                            {/* Payment Info */}
                            <div className='col-lg-3'>
                                <div className='box shadow-sm bg-light'>
                                    {order.isDelivered ? (
                                        <button
                                            className='btn btn-dark col-12'
                                            onClick={handleDelivered}
                                            disabled={order.isDelivered}
                                        >
                                            GIAO HÀNG VÀO{' '}
                                            {moment(order.deliveredAt).format('HH:MM - DD/MM/YY')}
                                        </button>
                                    ) : (
                                        <>
                                            {loadDelivered && <Loading />}
                                            <button
                                                className='btn btn-dark col-12'
                                                onClick={handleDelivered}
                                                disabled={order.isDelivered}
                                            >
                                                ĐÁNH DẤU ĐÃ GIAO HÀNG
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default OrderDetailmain;
