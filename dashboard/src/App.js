import React, { useEffect } from 'react';
import './App.css';
import './responsive.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/productScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import OrderScreen from './screens/OrderScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import AddProduct from './screens/AddProduct';
import Login from './screens/LoginScreen';
import UsersScreen from './screens/UsersScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import NotFound from './screens/NotFound';
import PrivateRouter from './PrivateRouter';
import { useDispatch, useSelector } from 'react-redux';
import { getListProducts } from './redux/actions/productActions';
import { getListOrders } from './redux/actions/orderActions';
import CategoryEdit from './components/Categories/CategoryEdit';
import { getListCategories } from './redux/actions/categoryActions';
import ReviewScreen from './screens/ReviewScreen';
import { getListReviews } from './redux/actions/reviewActions';
import ReviewsDetail from './components/reviews/ReviewsDetail';

function App() {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { user } = userLogin;

    useEffect(() => {
        if (user && user.isAdmin) {
            dispatch(getListProducts());
            dispatch(getListOrders());
            dispatch(getListCategories());
            dispatch(getListReviews());
        }
    }, [dispatch, user]);

    return (
        <>
            <Router>
                <Switch>
                    <PrivateRouter path='/' component={HomeScreen} exact />
                    <PrivateRouter path='/products' component={ProductScreen} />
                    <PrivateRouter path='/categories' component={CategoriesScreen} />
                    <PrivateRouter path='/orders' component={OrderScreen} />
                    <PrivateRouter path='/order/:id' component={OrderDetailScreen} />
                    <PrivateRouter path='/addproduct' component={AddProduct} />
                    <PrivateRouter path='/users' component={UsersScreen} />
                    <PrivateRouter path='/reviews' component={ReviewScreen} />
                    <PrivateRouter path='/product/:id/edit' component={ProductEditScreen} />
                    <PrivateRouter path='/product/:id/reviews' component={ReviewsDetail} />
                    <PrivateRouter path='/category/:id/edit' component={CategoryEdit} />
                    <Route path='/login' component={Login} />
                    <PrivateRouter path='*' component={NotFound} />
                </Switch>
            </Router>
        </>
    );
}

export default App;

