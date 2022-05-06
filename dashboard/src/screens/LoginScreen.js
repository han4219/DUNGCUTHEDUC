import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/LoadingError/Error';
import Loading from '../components/LoadingError/Loading';
import Toast from '../components/LoadingError/Toast';
import { userLogin } from '../redux/actions/userActions';

const Login = ({ history, location }) => {
    window.scrollTo(0, 0);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { error, load, user } = useSelector((state) => state.userLogin);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLogin(email, password));
    };

    useEffect(() => {
        if (user) {
            history.push('/');
        }
    }, [history, user]);
    return (
        <>
            <Toast />
            <div className='card shadow mx-auto' style={{ maxWidth: '380px', marginTop: '100px' }}>
                <div className='card-body'>
                    {error && <Message variant='alert-danger'>{error}</Message>}
                    {load && <Loading />}
                    <h4 className='card-title mb-4 text-center'>Sign in</h4>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <input
                                className='form-control'
                                placeholder='Email'
                                type='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className='mb-3'>
                            <input
                                className='form-control'
                                placeholder='Password'
                                type='password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className='mb-4'>
                            <button type='submit' className='btn btn-primary w-100'>
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
