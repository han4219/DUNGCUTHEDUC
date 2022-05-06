import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { editCategory, updateCategory } from '../../redux/actions/categoryActions';
import { CATEGORY_EDIT_RESET, CATEGORY_UPDATE_RESET } from '../../redux/constants/categoryConstant';
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

const CategoryEdit = ({ match }) => {
    const categoryId = match.params.id;
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    const categoryEdit = useSelector((state) => state.categoryEdit);
    const { load, error, category } = categoryEdit;
    const categoryUpdate = useSelector((state) => state.categoryUpdate);
    const { load: loadUpdate, error: errorUpdate, success: successUpdate } = categoryUpdate;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateCategory({ _id: categoryId, name }));
    };

    useEffect(() => {
        if (successUpdate) {
            toast.success('Cập nhật sản phẩm thành công', ToastObjects);
        } else {
            if (!category.name || category._id !== categoryId) {
                dispatch(editCategory(categoryId));
            } else {
                setName(category.name);
            }
        }
    }, [dispatch, categoryId, category, successUpdate]);

    useEffect(() => {
        return () => {
            dispatch({ type: CATEGORY_UPDATE_RESET });
            dispatch({ type: CATEGORY_EDIT_RESET });
        };
    }, [dispatch]);
    return (
        <>
            <Toast />
            <Sidebar />
            <main className='main-wrap'>
                <Header />
                <div className='container text-center mt-4'>
                    <Link to='/categories' className='btn btn-danger text-white'>
                        {'<'} Danh sách danh mục
                    </Link>
                </div>

                {errorUpdate && <Message variant='alert-danger'>{errorUpdate}</Message>}
                {loadUpdate && <Loading />}
                {load ? (
                    <Loading />
                ) : error ? (
                    <Message variant='alert-danger'>{error}</Message>
                ) : (
                    <section className='content-main'>
                        <div className='content-header'>
                            <h2 className='content-title'>Sửa danh mục sản phẩm</h2>
                        </div>

                        <div className='card shadow-sm'>
                            <div className='card-body'>
                                <div className='row'>
                                    <form onSubmit={handleSubmit}>
                                        <div className='mb-4'>
                                            <label htmlFor='category_name' className='form-label'>
                                                Tên danh mục
                                            </label>
                                            <input
                                                type='text'
                                                className='form-control py-3'
                                                id='category_name'
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                            />
                                        </div>

                                        <div className='d-grid'>
                                            <button className='btn btn-primary py-3' type='submit'>
                                                Cập nhật
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
};

export default CategoryEdit;
