import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding: 30px 50px 20px;
  background-color: #252525;
  color: #eee;
  display: flex;
  p,
  span {
    font-size: 15px;
  }
`;

export const FooterLeft = styled.div`
  flex: 1;
  padding-right: 20px;
  border-right: 1px solid #ccc;
`;
export const FooterTitle = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
  span {
    color: #ed212d;
    font-size: 18px;
  }
`;
export const FooterSubTitle = styled.div`
  font-size: 16px;
  margin: 20px 0;
`;

export const FooterRight = styled.div`
  flex: 2;
  padding-left: 20px;
`;
export const RightTop = styled.div`
  display: flex;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
  justify-content: space-around;
`;
export const RightTopBox = styled.div`
  span {
    i {
      color: #ed212d;
      margin-right: 10px;
    }
  }
`;
export const RightBottom = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: space-around;
`;
export const RightBottomBox = styled.div`
  a {
    color: #eee;
    font-size: 15px;
    &:hover {
      color: #ed212d;
    }
  }
`;
