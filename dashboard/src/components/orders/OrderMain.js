import React from 'react';
import { useSelector } from 'react-redux';
import Orders from './Orders';
import Loading from '../../components/LoadingError/Loading';
import Message from '../../components/LoadingError/Error';

const OrderMain = () => {
    const orderList = useSelector((state) => state.orderList);
    const { load, error, orders } = orderList;
    return (
        <section className='content-main'>
            <div className='content-header'>
                <h2 className='content-title'>Danh sách đơn hàng</h2>
            </div>

            <div className='card mb-4 shadow-sm'>
                <header className='card-header bg-white'>
                    <div className='row gx-3 py-3'>
                        <div className='col-lg-4 col-md-6 me-auto'>
                            <input
                                type='text'
                                placeholder='Tìm kiếm...'
                                className='form-control p-2'
                            />
                        </div>
                        <div className='col-lg-2 col-6 col-md-3'>
                            <select className='form-select'>
                                <option>Tình trạng</option>
                                <option>Hoạt động</option>
                                <option>Vô hiệu hóa</option>
                                <option>Xem tất cả</option>
                            </select>
                        </div>
                        <div className='col-lg-2 col-6 col-md-3'>
                            <select className='form-select'>
                                <option>Xem 20</option>
                                <option>Xem 30</option>
                                <option>Xem 40</option>
                            </select>
                        </div>
                    </div>
                </header>
                <div className='card-body'>
                    <div className='table-responsive'>
                        {load ? (
                            <Loading />
                        ) : error ? (
                            <Message variant='alert-danger'>{error}</Message>
                        ) : (
                            <Orders orders={orders} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderMain;
