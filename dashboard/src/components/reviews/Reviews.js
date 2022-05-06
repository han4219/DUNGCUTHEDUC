import React from 'react';
import { Link } from 'react-router-dom';

const Reviews = ({ listReviews }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>Sản phẩm</th>
                    <th scope='col'>Hình ảnh</th>
                    <th scope='col'>Số đánh giá</th>
                    <th scope='col' className='text-end'>
                        Xem bài đánh giá
                    </th>
                </tr>
            </thead>
            <tbody>
                {listReviews.map((item) => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>
                            <img src={item.image} alt=''></img>
                        </td>
                        <td>{item.numReviews}</td>
                        <td className='d-flex justify-content-center align-item-center'>
                            <Link to={`/product/${item._id}/reviews`} className='text-success'>
                                <i className='fas fa-eye'></i>
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default Reviews;
