import React from 'react';
import TopTotal from './TopTotal';
import LatestOrder from './LatestOrder';
import SaleStatistics from './SalesStatistics';
import ProductsStatistics from './ProductsStatistics';
import { useSelector } from 'react-redux';

const Main = () => {
    const { products } = useSelector((state) => state.productList);
    const orderList = useSelector((state) => state.orderList);
    const { load, error, orders } = orderList;
    return (
        <>
            <section className='content-main'>
                <div className='content-header'>
                    <h2 className='content-title'> Quản trị </h2>
                </div>
                {/* Top Total */}
                <TopTotal orders={orders} products={products} />

                <div className='row'>
                    {/* STATICS */}
                    <SaleStatistics />
                    <ProductsStatistics />
                </div>

                {/* LATEST ORDER */}
                <div className='card mb-4 shadow-sm'>
                    <LatestOrder orders={orders} load={load} error={error} />
                </div>
            </section>
        </>
    );
};

export default Main;