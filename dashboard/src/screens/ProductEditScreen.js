import React from 'react';
import Sidebar from './../components/sidebar';
import Header from './../components/Header';
import EditProductMain from './../components/products/EditproductMain';
// import { useSelector } from 'react-redux';

const ProductEditScreen = ({ match }) => {
    // const { load, product } = useSelector((state) => state.productEdit);
    const productId = match.params.id;
    return (
        <>
            <Sidebar />
            <main className='main-wrap'>
                <Header />
                <EditProductMain productId={productId} />
            </main>
        </>
    );
};
export default ProductEditScreen;
