import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory } from '../../redux/actions/categoryActions';
import Message from '../LoadingError/Error';

const CreateCategory = () => {
    const dispatch = useDispatch();
    const [categoryName, setCategoryName] = useState('');
    const name = categoryName;
    const { error } = useSelector((state) => state.categoryCreate);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createCategory({ name }));
    };
    return (
        <div className='col-md-12 col-lg-4'>
            {error && <Message variant='alert-danger'>{error}</Message>}
            <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                    <label htmlFor='product_name' className='form-label'>
                        Tên danh mục
                    </label>
                    <input
                        type='text'
                        placeholder='Nhập tại đây...'
                        className='form-control py-3'
                        id='product_name'
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>

                <div className='d-grid'>
                    <button className='btn btn-primary py-3' type='submit'>
                        Tạo danh mục
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateCategory;
