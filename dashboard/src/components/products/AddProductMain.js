import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createProduct } from '../../redux/actions/productActions';
import Message from '../../components/LoadingError/Error';
import Loading from '../../components/LoadingError/Loading';
import Toast from '../../components/LoadingError/Toast';
import { PRODUCT_CREATE_RESET } from '../../redux/constants/productContants';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};
const AddProductMain = () => {
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [trademark, setTrademark] = useState('');
    const [category, setCategory] = useState('');

    const dispatch = useDispatch();

    const { load, error, product } = useSelector((state) => state.productCreate);
    const listCategory = useSelector((state) => state.categoryList);
    const { categorys } = listCategory;

    useEffect(() => {
        if (product) {
            toast.success('Thêm sản phẩm thành công', ToastObjects);
            dispatch({ type: PRODUCT_CREATE_RESET });
            setName('');
            setImage('');
            setDescription('');
            setPrice(0);
            setQuantity(0);
            setTrademark('');
            setCategory('');
        }
    }, [dispatch, product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createProduct({ name, image, description, price, quantity, trademark, category }));
    };

    return (
        <>
            <Toast />
            <section className='content-main' style={{ maxWidth: '1200px' }}>
                <form onSubmit={handleSubmit}>
                    <div className='content-header'>
                        <Link to='/products' className='btn btn-danger text-white'>
                            Danh sách sản phẩm
                        </Link>
                        <h2 className='content-title'>Thêm sản phẩm</h2>
                        <div>
                            <button type='submit' className='btn btn-primary'>
                                Thêm
                            </button>
                        </div>
                    </div>

                    <div className='row mb-4'>
                        <div className='col-xl-8 col-lg-8'>
                            <div className='card mb-4 shadow-sm'>
                                <div className='card-body'>
                                    {error && <Message variant='alert-danger'>{error}</Message>}
                                    {load && <Loading />}
                                    <div className='mb-4'>
                                        <label htmlFor='product_category' className='form-label'>
                                            Danh mục sản phẩm
                                        </label>
                                        <select
                                            className='form-control'
                                            required
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option>--danh mục sản phẩm--</option>
                                            {categorys.map((cate) => (
                                                <option key={cate._id} value={cate._id}>
                                                    {cate.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='mb-4'>
                                        <label htmlFor='product_title' className='form-label'>
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
                                        <label htmlFor='product_price' className='form-label'>
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
                                        <label htmlFor='product_price' className='form-label'>
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
                                        <label htmlFor='product_trademark' className='form-label'>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};

export default AddProductMain;
