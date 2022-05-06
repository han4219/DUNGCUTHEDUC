import React from 'react';

const TopTotal = ({ products, orders }) => {
    let totalSales = 0;
    if (orders) {
        orders.map((order) => (order.isPaid ? (totalSales = totalSales + order.totalPrice) : null));
    }
    return (
        <div className='row'>
            <div className='col-lg-4'>
                <div className='card card-body mb-4 shadow-sm'>
                    <article className='icontext'>
                        <span className='icon icon-sm rounded-circle alert-primary'>
                            <i className='text-primary fas fa-usd-circle'></i>
                        </span>
                        <div className='text'>
                            <h6 className='mb-1'>Tổng doanh số</h6>{' '}
                            <span>
                                {totalSales.toLocaleString('vi', {
                                    style: 'currency',
                                    currency: 'VND',
                                })}
                            </span>
                        </div>
                    </article>
                </div>
            </div>
            <div className='col-lg-4'>
                <div className='card card-body mb-4 shadow-sm'>
                    <article className='icontext'>
                        <span className='icon icon-sm rounded-circle alert-success'>
                            <i className='text-success fas fa-bags-shopping'></i>
                        </span>
                        <div className='text'>
                            <h6 className='mb-1'>Tổng đơn hàng</h6>
                            <span>{orders ? orders.length : ''}</span>
                        </div>
                    </article>
                </div>
            </div>
            <div className='col-lg-4'>
                <div className='card card-body mb-4 shadow-sm'>
                    <article className='icontext'>
                        <span className='icon icon-sm rounded-circle alert-warning'>
                            <i className='text-warning fas fa-shopping-basket'></i>
                        </span>
                        <div className='text'>
                            <h6 className='mb-1'>Tổng sản phẩm</h6>
                            <span>{products ? products.length : ''}</span>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    );
};

export default TopTotal;
