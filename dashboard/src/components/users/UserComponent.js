import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import { getListUsers } from '../../redux/actions/userActions';
import Loading from '../../components/LoadingError/Loading';
import Message from '../../components/LoadingError/Error';

const UserComponent = () => {
    const dispatch = useDispatch();
    const { load, error, users } = useSelector((state) => state.userList);

    useEffect(() => {
        dispatch(getListUsers());
    }, [dispatch]);
    return (
        <section className='content-main'>
            <div className='content-header'>
                <h2 className='content-title'>Tài khoản người dùng</h2>
                {/* <div>
                    <Link to='#' className='btn btn-primary'>
                        <i className='material-icons md-plus'></i> Tạo mới
                    </Link>
                </div> */}
            </div>

            <div className='card mb-4'>
                {/* <header className='card-header'>
                    <div className='row gx-3'>
                        <div className='col-lg-4 col-md-6 me-auto'>
                            <input type='text' placeholder='Tìm kiếm...' className='form-control' />
                        </div>
                        <div className='col-lg-2 col-6 col-md-3'>
                            <select className='form-select'>
                                <option>Hiển thị 20</option>
                                <option>Hiển thị 30</option>
                                <option>Hiển thị 40</option>
                                <option>Hiển thị all</option>
                            </select>
                        </div>
                        <div className='col-lg-2 col-6 col-md-3'>
                            <select className='form-select'>
                                <option>Tình trạng: tất cả</option>
                                <option>Chỉ hoạt động</option>
                                <option>Vô hiệu hóa</option>
                            </select>
                        </div>
                    </div>
                </header> */}

                {/* Card */}

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
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {/* nav */}
                    {/* <nav className='float-end mt-4' aria-label='Page navigation'>
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
                                    Next
                                </Link>
                            </li>
                        </ul>
                    </nav> */}
                </div>
            </div>
        </section>
    );
};

export default UserComponent;
