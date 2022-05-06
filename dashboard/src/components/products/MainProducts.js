import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { getListProducts } from '../../redux/actions/productActions';
import Loading from '../../components/LoadingError/Loading';
import Message from '../../components/LoadingError/Error';

const MainProducts = () => {
    const dispatch = useDispatch();
    const { load, error, products } = useSelector((state) => state.productList);
    const { error: errorDelete, success: successDelete } = useSelector(
        (state) => state.productDelete
    );

    useEffect(() => {
        dispatch(getListProducts());
    }, [dispatch, successDelete]);

    return (
        <section className='content-main'>
            <div className='content-header'>
                <h2 className='content-title'>Danh sách sản phẩm</h2>
                <div>
                    <Link to='/addproduct' className='btn btn-primary'>
                        Thêm mới
                    </Link>
                </div>
            </div>

            <div className='card mb-4 shadow-sm'>
                <header className='card-header bg-white '>
                    <div className='row gx-3 py-3'>
                        <div className='col-lg-4 col-md-6 me-auto '>
                            <input
                                type='search'
                                placeholder='Tìm kiếm...'
                                className='form-control p-2'
                            />
                        </div>
                        <div className='col-lg-3 col-6 col-md-3'>
                            <select className='form-select'>
                                <option>Tất cả danh mục</option>
                                <option>Máy chạy bộ</option>
                                <option>Dụng cụ tập gym</option>
                                <option>Dụng cụ võ thuật</option>
                                <option>Xe đạp tập</option>
                                <option>Máy tập bụng</option>
                            </select>
                        </div>
                        <div className='col-lg-3 col-6 col-md-3'>
                            <select className='form-select'>
                                <option>Mới nhất</option>
                                <option>Rẻ nhất</option>
                                <option>Xem nhiều nhất</option>
                            </select>
                        </div>
                    </div>
                </header>

                <div className='card-body'>
                    {errorDelete && <Message variant='alert-danger'>{errorDelete}</Message>}
                    {load ? (
                        <Loading />
                    ) : error ? (
                        <Message variant='alert-danger'>{error}</Message>
                    ) : (
                        <div className='row'>
                            {/* Products */}
                            {products.map((product) => (
                                <Product product={product} key={product._id} />
                            ))}
                        </div>
                    )}

                    <nav className='float-end mt-4' aria-label='Page navigation'>
                        <ul className='pagination'>
                            <li className='page-item disabled'>
                                <Link className='page-link' to='#'>
                                    Previous
                                </Link>
                            </li>
                            <li className='page-item active'>
                                <Link className='page-link' to='#'>
                                    1
                                </Link>
                            </li>
                            <li className='page-item'>
                                <Link className='page-link' to='#'>
                                    2
                                </Link>
                            </li>
                            <li className='page-item'>
                                <Link className='page-link' to='#'>
                                    3
                                </Link>
                            </li>
                            <li className='page-item'>
                                <Link className='page-link' to='#'>
                                    Next
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </section>
    );
};

export default MainProducts;
