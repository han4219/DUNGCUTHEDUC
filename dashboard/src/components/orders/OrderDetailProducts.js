import React from 'react';
import { Link } from 'react-router-dom';

const OrderDetailProducts = ({ order, load }) => {
    if (!load) {
        order.itemsPrice = order.orderItems
            .reduce((acc, item) => acc + item.price * item.qty, 0)
            .toLocaleString('vi', {
                style: 'currency',
                currency: 'VND',
            });
    }

    return (
        <table className='table border table-lg'>
            <thead>
                <tr>
                    <th style={{ width: '40%' }}>Sẩn phẩm</th>
                    <th style={{ width: '20%' }}>Đơn giá</th>
                    <th style={{ width: '20%' }}>Số lượng</th>
                    <th style={{ width: '20%' }} className='text-end'>
                        Tổng
                    </th>
                </tr>
            </thead>
            <tbody>
                {order.orderItems.map((item, index) => (
                    <tr key={index}>
                        <td>
                            <Link className='itemside' to='#'>
                                <div className='left'>
                                    <img
                                        src={item.image}
                                        alt='product'
                                        style={{ width: '40px', height: '40px' }}
                                        className='img-xs'
                                    />
                                </div>
                                <div className='info'>{item.name}</div>
                            </Link>
                        </td>
                        <td>
                            {item.price.toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </td>
                        <td>{item.qty}</td>
                        <td className='text-end'>
                            {(item.price * item.qty).toLocaleString('vi', {
                                style: 'currency',
                                currency: 'VND',
                            })}
                        </td>
                    </tr>
                ))}

                <tr>
                    <td colSpan='4'>
                        <article className='float-end'>
                            <dl className='dlist'>
                                <dt>Tạm tính:</dt> <dd>{order.itemsPrice}</dd>
                            </dl>
                            <dl className='dlist'>
                                <dt>Giá ship:</dt>{' '}
                                <dd>
                                    {order.shippingPrice.toLocaleString('vi', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </dd>
                            </dl>
                            <dl className='dlist'>
                                <dt>Thuế:</dt>{' '}
                                <dd>
                                    {order.taxPrice.toLocaleString('vi', {
                                        style: 'currency',
                                        currency: 'VND',
                                    })}
                                </dd>
                            </dl>
                            <dl className='dlist'>
                                <dt>Tổng cộng:</dt>
                                <dd>
                                    <b className='h5'>
                                        {order.totalPrice.toLocaleString('vi', {
                                            style: 'currency',
                                            currency: 'VND',
                                        })}
                                    </b>
                                </dd>
                            </dl>
                            <dl className='dlist'>
                                <dt className='text-muted'>Trạng thái:</dt>
                                <dd>
                                    {order.isPaid ? (
                                        <span className='badge rounded-pill alert alert-success text-success'>
                                            Đã thanh toán
                                        </span>
                                    ) : (
                                        <span className='badge rounded-pill alert alert-danger text-danger'>
                                            Chưa thanh toán
                                        </span>
                                    )}
                                </dd>
                            </dl>
                        </article>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default OrderDetailProducts;
