import React from 'react';
import Reviews from './Reviews';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingError/Loading';
import Message from '../../components/LoadingError/Error';
const ReviewComponent = () => {
    const reviewList = useSelector((state) => state.reviewList);
    const { load, error, reviews: listReviews } = reviewList;
    return (
        <section className='content-main'>
            <div className='content-header'>
                <h2 className='content-title'>Phê duyệt bài viết</h2>
            </div>
            <div className='card mb-4 shadow-sm'>
                <div className='card-body'>
                    <div className='table-responsive'>
                        {load ? (
                            <Loading />
                        ) : error ? (
                            <Message variant='alert-danger'>{error}</Message>
                        ) : (
                            <Reviews listReviews={listReviews} />
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewComponent;
