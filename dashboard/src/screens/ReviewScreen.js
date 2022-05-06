import React from 'react';
import Header from '../components/Header';
import ReviewComponent from '../components/reviews/ReviewComponent';
import Sidebar from '../components/sidebar';

const ReviewScreen = () => {
    return (
        <>
            <Sidebar />
            <main className='main-wrap'>
                <Header />
                <ReviewComponent />
            </main>
        </>
    );
};

export default ReviewScreen;
