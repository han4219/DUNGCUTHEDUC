import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../LoadingError/Loading';
import Message from '../LoadingError/Error';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategory, getListCategories } from '../../redux/actions/categoryActions';

const CategoriesTable = ({ load, error, categorys }) => {
    const dispatch = useDispatch();

    const { load: loadCreate } = useSelector((state) => state.categoryCreate);

    const handleDelete = (id) => {
        dispatch(deleteCategory(id));
    };
    useEffect(() => {
        if (loadCreate === false) {
            dispatch(getListCategories());
        }
    }, [dispatch, loadCreate]);

    return (
        <div className='col-md-12 col-lg-8'>
            {load ? (
                <Loading />
            ) : error ? (
                <Message variant='alert-danger'>{error}</Message>
            ) : (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên danh mục</th>
                            <th className='text-end'>Thao tác</th>
                        </tr>
                    </thead>
                    {/* Table Data */}
                    {loadCreate ? (
                        <Loading />
                    ) : (
                        <tbody>
                            {categorys.map((item) => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>
                                        <b>{item.name}</b>
                                    </td>
                                    <td className='text-end'>
                                        <div className='dropdown'>
                                            <Link
                                                to='#'
                                                data-bs-toggle='dropdown'
                                                className='btn btn-light'
                                            >
                                                <i className='fas fa-ellipsis-h'></i>
                                            </Link>
                                            <div className='dropdown-menu'>
                                                <Link
                                                    className='dropdown-item'
                                                    to={`/category/${item._id}/edit`}
                                                >
                                                    Edit info
                                                </Link>
                                                <Link
                                                    className='dropdown-item text-danger'
                                                    to='#'
                                                    onClick={() => handleDelete(item._id)}
                                                >
                                                    Delete
                                                </Link>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            )}
        </div>
    );
};

export default CategoriesTable;
