import React, { useEffect, useState } from 'react';
import Toast from './../LoadingError/Toast';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { editProduct, updateProduct } from '../../redux/actions/productActions';
import Message from '../LoadingError/Error';
import Loading from '../LoadingError/Loading';
import { PRODUCT_UPDATE_RESET } from '../../redux/constants/productContants';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const EditProductMain = (props) => {
    const { productId } = props;

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [trademark, setTrademark] = useState('');

    const dispatch = useDispatch();

    const productEdit = useSelector((state) => state.productEdit);
    const { load, error, product } = productEdit;
    const productUpdate = useSelector((state) => state.productUpdate);
    const { load: loadUpdate, error: errorUpdate, success: successUpdate } = productUpdate;
    const listCategory = useSelector((state) => state.categoryList);
    const { categorys } = listCategory;

    useEffect(() => {
        if (successUpdate) {
            toast.success('Cập nhật sản phẩm thành công', ToastObjects);
        } else {
            if (!product.name || product._id !== productId) {
                dispatch(editProduct(productId));
            } else {
                setName(product.name);
                setImage(product.image);
                setDescription(product.description);
                setPrice(product.price);
                setQuantity(product.quantity);
                setTrademark(product.trademark);
            }
        }
    }, [dispatch, product, productId, successUpdate]);

    useEffect(() => {
        return () => {
            dispatch({ type: PRODUCT_UPDATE_RESET });
        };
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            updateProduct({
                _id: productId,
                name,
                image,
                description,
                price,
                quantity,
                trademark,
            })
        );
    };
    const categoryName = categorys.find((cate) => cate._id === product.category);
    return (
        <>
            <Toast />
            <section className='content-main' style={{ maxWidth: '1200px' }}>
                <form onSubmit={handleSubmit}>
                    <div className='content-header'>
                        <Link to='/products' className='btn btn-danger text-white'>
                            Danh sách sản phẩm
                        </Link>
                        <h2 className='content-title'>Cập nhật sản phẩm</h2>
                        <div>
                            <button type='submit' className='btn btn-primary'>
                                Cập nhật
                            </button>
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-xl-8 col-lg-8'>
                            <div className='card mb-4 shadow-sm'>
                                <div className='card-body'>
                                    {errorUpdate && (
                                        <Message variant='alert-danger'>{errorUpdate}</Message>
                                    )}
                                    {loadUpdate && <Loading />}
                                    {load ? (
                                        <Loading />
                                    ) : error ? (
                                        <Message variant='alert-danger'>{error}</Message>
                                    ) : (
                                        <>
                                            <div className='mb-4'>
                                                <label
                                                    htmlFor='product_category'
                                                    className='form-label'
                                                >
                                                    Danh mục sản phẩm
                                                </label>
                                                <input
                                                    type='text'
                                                    className='form-control'
                                                    id='product_category'
                                                    value={categoryName ? categoryName.name : ''}
                                                    disabled
                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    htmlFor='product_title'
                                                    className='form-label'
                                                >
                                                    Tiêu đề sản phẩm
                                                </label>
                                                <input
                                                    type='text'
                                                    placeholder='Nhập tại đây...'
                                                    className='form-control'
                                                    id='product_title'
                                                    required
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    htmlFor='product_price'
                                                    className='form-label'
                                                >
                                                    Giá
                                                </label>
                                                <input
                                                    type='number'
                                                    placeholder='Nhập tại đây...'
                                                    className='form-control'
                                                    id='product_price'
                                                    required
                                                    value={price}
                                                    onChange={(e) => setPrice(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    htmlFor='product_price'
                                                    className='form-label'
                                                >
                                                    Số lượng
                                                </label>
                                                <input
                                                    type='number'
                                                    placeholder='Nhập tại đây...'
                                                    className='form-control'
                                                    id='product_price'
                                                    required
                                                    value={quantity}
                                                    onChange={(e) => setQuantity(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label
                                                    htmlFor='product_trademark'
                                                    className='form-label'
                                                >
                                                    Thương hiệu
                                                </label>
                                                <input
                                                    type='text'
                                                    placeholder='Nhập tại đây...'
                                                    className='form-control'
                                                    id='product_trademark'
                                                    required
                                                    value={trademark}
                                                    onChange={(e) => setTrademark(e.target.value)}
                                                />
                                            </div>
                                            <div className='mb-4'>
                                                <label className='form-label'>Mô tả</label>
                                                <textarea
                                                    placeholder='Nhập tại đây...'
                                                    className='form-control'
                                                    rows='7'
                                                    required
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                ></textarea>
                                            </div>
                                            <div className='mb-4'>
                                                <label className='form-label'>Ảnh</label>
                                                <input
                                                    className='form-control'
                                                    type='text'
                                                    placeholder='Nhập địa chỉ ảnh'
                                                    value={image}
                                                    required
                                                    onChange={(e) => setImage(e.target.value)}
                                                />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default EditProductMain;
