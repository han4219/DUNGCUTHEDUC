import React from 'react';
import { Link } from 'react-router-dom';
import * as S from '../components/Footer/footer.style';

const Footer = () => {
  return (
    <S.Wrapper>
      <S.FooterLeft>
        <S.FooterTitle>
          DỤNG CỤ <span>THỂ DỤC THỂ THAO</span>
        </S.FooterTitle>
        <p>
          Dụng Cụ Thể Dục là đơn vị chuyên bán buôn bán lẻ dụng cụ thể thao, máy
          tập thể dục và dụng cụ tập Gym. Cam kết chính hãng, giá rẻ nhất tại
          Việt Nam. Quý khách hàng có nhu cầu mua dụng cụ thể dục, thể thao và
          thể hình xin vui lòng liên hệ:
        </p>
        <S.FooterSubTitle>Hộ kinh doanh Quang Anh Sport</S.FooterSubTitle>
        <span>- Địa chỉ ĐKKD: 219 Định Công, Hoàng Mai, Hà Nội</span>
        <br />
        <span>- Điện thoại: 0965 172 281</span>
        <br />
        <span>- Email: lienhe@dungcutheduc.vn</span>
        <br />
        <span>
          - Giấy chứng nhận ĐKKD số 01M8027099 do phòng Tài chính - Kế hoạch
          quận Hoàng Mai cấp ngày 01/03/2021
        </span>
      </S.FooterLeft>
      <S.FooterRight>
        <S.RightTop>
          <S.RightTopBox>
            <S.FooterTitle>HÀ NỘI</S.FooterTitle>
            <span>
              <i class="fas fa-map-marker-alt"></i>Số 219 Định Công, Quận Hoàng
              Mai
            </span>
            <br></br>
            <span>
              <i class="fas fa-phone-square"></i>0939 987 456
            </span>
            <br></br>
            <span>
              <i class="far fa-road"></i>Xem sơ đồ đường đi
            </span>
          </S.RightTopBox>
          <S.RightTopBox>
            <S.FooterTitle>THÀNH PHỐ HỒ CHÍNH MINH</S.FooterTitle>
            <span>
              <i class="fas fa-map-marker-alt"></i>F1/3 Cư xá Phú Lâm B, Phường
              13, Quận 6
            </span>
            <br></br>
            <span>
              <i class="fas fa-phone-square"></i>0969 131 990
            </span>
            <br></br>
            <span>
              <i class="far fa-road"></i>Xem sơ đồ đường đi
            </span>
          </S.RightTopBox>
        </S.RightTop>
        <S.RightBottom>
          <S.RightBottomBox>
            <S.FooterTitle>SẢN PHẨM</S.FooterTitle>
            <Link to="">Dụng cụ tập gym</Link>
            <br />
            <Link to="">Dụng cụ võ thuật</Link>
            <br />
            <Link to="">Máy chạy bộ</Link>
            <br />
            <Link to="">Máy tập bụng</Link>
            <br />
            <Link to="">Xe đạp tập</Link>
          </S.RightBottomBox>
          <S.RightBottomBox>
            <S.FooterTitle>THÔNG TIN</S.FooterTitle>
            <Link to="">Giới thiệu</Link>
            <br />
            <Link to="">Cam kết khách hàng</Link>
            <br />
            <Link to="">Hướng dẫn mua hàng</Link>
            <br />
            <Link to="">Phương thức thanh toán</Link>
            <br />
            <Link to="">Vận chuyển & Giao hàng</Link>
          </S.RightBottomBox>
          <S.RightBottomBox>
            <S.FooterTitle>CHÍNH SÁCH</S.FooterTitle>
            <Link to="">Chính sách đổi trả</Link>
            <br />
            <Link to="">Chính sách bảo mật</Link>
            <br />
            <Link to="">Bảo mật cá nhân</Link>
            <br />
            <Link to="">Điều khoản sử dụng</Link>
            <br />
            <Link to="">Chính sách bảo hành</Link>
          </S.RightBottomBox>
        </S.RightBottom>
      </S.FooterRight>
    </S.Wrapper>
  );
};

export default Footer;
