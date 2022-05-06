import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { editProduct, updateProduct } from '../../redux/actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../redux/constants/productContants';
import Header from '../Header';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import Toast from '../LoadingError/Toast';
import Sidebar from '../sidebar';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const ReviewsDetail = ({ match }) => {
    const productId = match.params.id;
    const dispatch = useDispatch();

    const productEdit = useSelector((state) => state.productEdit);
    const { load, error, product } = productEdit;
    const productUpdate = useSelector((state) => state.productUpdate);
    const { load: loadUpdate, error: errorUpdate, success: successUpdate } = productUpdate;
    useEffect(() => {
        if (successUpdate) {
            toast.success('Duyệt bài đánh giá thành công', ToastObjects);
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(editProduct(productId));
            }
        }
    }, [dispatch, product, successUpdate, productId]);
    const handleShow = (id) => {
        const listReviews = product.reviews;
        listReviews.forEach((element) => {
            if (element._id === id) {
                element.show = true;
            }
        });
        product.reviews = listReviews;
        dispatch(updateProduct(product));
    };
    useEffect(() => {
        return () => {
            dispatch({ type: PRODUCT_UPDATE_RESET });
        };
    }, [dispatch]);
    return (
        <>
            <Toast />
            <Sidebar />
            <main className='main-wrap'>
                <Header />
                <section className='content-main'>
                    <div className='content-header'>
                        <h2 className='content-title'>Duyệt bài đánh giá</h2>
                    </div>
                    {errorUpdate && <Message variant='alert-danger'>{errorUpdate}</Message>}
                    {loadUpdate && <Loading />}
                    {load ? (
                        <Loading />
                    ) : error ? (
                        <Message variant='alert-danger'>{error}</Message>
                    ) : (
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Xếp hạng</th>
                                    <th>Nhận xét của khách hàng</th>
                                    <th>Duyệt bài</th>
                                </tr>
                            </thead>
                            <tbody>
                                {product.reviews.map((review) => (
                                    <tr key={review._id}>
                                        <td>{review._id}</td>
                                        <td>{review.rating}</td>
                                        <td>{review.comment}</td>
                                        <td>
                                            {review.show ? (
                                                <button disabled>
                                                    <i className='fas fa-eye'></i>
                                                </button>
                                            ) : (
                                                <button onClick={() => handleShow(review._id)}>
                                                    <i className='fas fa-eye'></i>
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </section>
            </main>
        </>
    );
};

export default ReviewsDetail;
