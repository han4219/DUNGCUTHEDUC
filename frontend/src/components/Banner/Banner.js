import React from "react";
import "./banner.css";

const Banner = () => {
  return (
    <div className="container banner">
      <div className="row mt-4 pb-4">
        {/* carousel */}
        <div
          id="carouselExampleInterval"
          className="carousel slide col-md-12"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner w-100">
            <div
              className="carousel-item active w-100"
              data-bs-interval={10000}
            >
              <img
                src="https://res.cloudinary.com/di404qols/image/upload/v1651508558/banner/slide1_cuuvvz.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item w-100" data-bs-interval={2000}>
              <img
                src="https://res.cloudinary.com/di404qols/image/upload/v1651508558/banner/slide2_mhrxx9.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
            <div className="carousel-item w-100">
              <img
                src="https://res.cloudinary.com/di404qols/image/upload/v1651508557/banner/slide3_inyv12.jpg"
                className="d-block w-100"
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
          </button>
        </div>

        {/* end carousel */}

        {/* mini banner */}
        <div className="col-md-4 mini-banner"></div>
        {/* end mini banner */}
      </div>
    </div>
  );
};

export default Banner;
