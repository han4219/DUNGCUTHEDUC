import React from 'react';

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Đăng ký nhận tin</h2>
              <p>Cập nhật tin tức, sản phẩm,...</p>
              <form className="form-section">
                <input
                  placeholder="Email của bạn..."
                  name="email"
                  type="email"
                />
                <input value="Đăng ký" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
