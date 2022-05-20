import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { changeStatus, deleteUser, getListUsers } from '../../redux/actions/userActions';
import Loading from '../../components/LoadingError/Loading';
import Message from '../../components/LoadingError/Error';
import Toast from '../LoadingError/Toast';
import { toast } from 'react-toastify';

const ToastObjects = {
    pauseOnFocusLoss: false,
    draggable: false,
    pauseOnHover: false,
    autoClose: 2000,
};

const UserComponent = () => {
    const dispatch = useDispatch();
    const { load, error, users } = useSelector((state) => state.userList);
    const {
        load: loadUpdate,
        success: successUpdate,
        error: errorUpdate,
    } = useSelector((state) => state.userChangeStatus);
    const {
        load: loadDelete,
        success: successDelete,
        error: errorDelete,
    } = useSelector((state) => state.userDelete);

    useEffect(() => {
        dispatch(getListUsers());
    }, [dispatch]);

    const handleChangeStatus = (id) => {
        dispatch(changeStatus(id));
    };

    const handleDelete = (id) => {
        dispatch(deleteUser(id));
    };

    useEffect(() => {
        if (successUpdate) {
            toast.success('Thay đổi trạng thái thành công.', ToastObjects);
        }
        dispatch(getListUsers());
    }, [successUpdate, dispatch]);

    useEffect(() => {
        if (successDelete) {
            toast.success('Xóa tài khoản thành công.', ToastObjects);
        }
        dispatch(getListUsers());
    }, [successDelete, dispatch]);

    return (
        <>
            <Toast />
            <section className='content-main'>
                <div className='content-header'>
                    <h2 className='content-title'>Tài khoản người dùng</h2>
                </div>

                <div className='card mb-4'>
                    <div className='card-body'>
                        {load ? (
                            <Loading />
                        ) : error ? (
                            <Message variant='alert-danger'>{error}</Message>
                        ) : (
                            <div className='row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4'>
                                {users.map((user) => (
                                    <div className='col' key={user._id}>
                                        <div className='card card-user shadow-sm'>
                                            <div className='card-header'>
                                                <img
                                                    className='img-md img-avatar'
                                                    src='images/favicon.png'
                                                    alt='User pic'
                                                />
                                            </div>
                                            <div className='card-body'>
                                                <h5 className='card-title mt-5'>
                                                    {user.isAdmin ? 'Admin' : 'User'}
                                                </h5>
                                                <div className='card-text text-muted'>
                                                    <p className='m-0'>{user.name}</p>
                                                    <p>
                                                        <a href={`mailto:${user.email}`}>
                                                            {user.email}
                                                        </a>
                                                    </p>
                                                </div>
                                                <div className='action'>
                                                    <button
                                                        onClick={() => handleChangeStatus(user._id)}
                                                    >
                                                        {user.status
                                                            ? 'Disabled'
                                                            : user.status === 'undefined'
                                                            ? 'Disable'
                                                            : 'Enable'}
                                                    </button>
                                                    <button onClick={() => handleDelete(user._id)}>
                                                        <i class='fas fa-trash'></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default UserComponent;
