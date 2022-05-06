import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRouter({ component: Component, ...rest }) {
    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin;
    return (
        <Route
            {...rest}
            component={(props) => {
                if (user && user.isAdmin) {
                    return <Component {...props} />;
                } else {
                    return <Redirect to={'/login'} />;
                }
            }}
        />
    );
}

export default PrivateRouter;
