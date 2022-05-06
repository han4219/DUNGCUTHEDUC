import React, { useEffect } from 'react';
import CreateCategory from './CreateCategory';
import CategoriesTable from './CategoriesTable';
import { useDispatch, useSelector } from 'react-redux';
import { getListCategories } from '../../redux/actions/categoryActions';

const MainCategories = () => {
    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { load, error, categorys } = categoryList;

    useEffect(() => {
        dispatch(getListCategories());
    }, [dispatch]);

    return (
        <section className='content-main'>
            <div className='content-header'>
                <h2 className='content-title'>Danh mục sản phẩm</h2>
            </div>

            <div className='card shadow-sm'>
                <div className='card-body'>
                    <div className='row'>
                        {/* Create category */}
                        <CreateCategory />
                        {/* Categories table */}
                        <CategoriesTable load={load} error={error} categorys={categorys} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MainCategories;
