import React from 'react';

const SaleStatistics = () => {
    return (
        <div className='col-xl-6 col-lg-12'>
            <div className='card mb-4 shadow-sm'>
                <article className='card-body'>
                    <h5 className='card-title'>Thống kê bán hàng</h5>
                    <iframe
                        title='staticsis'
                        style={{
                            background: '#FFFFFF',
                            border: 'none',
                            borderRadius: '2px',
                            boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
                            width: '100%',
                            height: '350px',
                        }}
                        src='https://charts.mongodb.com/charts-dungcutheduc-idjud/embed/charts?id=6263643e-ed17-4151-8a15-ac4aaa8e8b3f&maxDataAge=3600&theme=light&autoRefresh=true'
                    ></iframe>
                </article>
            </div>
        </div>
    );
};

export default SaleStatistics;
