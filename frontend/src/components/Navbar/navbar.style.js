import styled from "styled-components";
import { Link } from "react-router-dom";

export const Wrapper = styled.div``;
export const WrapperBoxNav1 = styled.div`
  &.showNav {
    display: block;
    transition: 0.3s ease-in-out;
  }
  width: 100%;
  position: fixed;
  top: 0;
  display: none;
  z-index: 10;
  padding: 10px 50px;
  background: url("./../../../public/images/menu-bg.png") #222;
`;
export const WrapperBoxNav2 = styled.div`
  width: 100%;
  &.hideNav {
    display: none;
    transition: 0.5s ease-in-out;
  }
  padding: 10px 50px;
  display: flex;
  background: url("./../../../public/images/menu-bg.png") #222;
`;
export const WrapperNav2 = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const WrapperNav = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const HomeIcon = styled(Link)`
  color: #ed212d;
  &:hover {
    color: #ed212d;
  }
`;
export const CategoryItem = styled(Link)`
  color: #eee;
  margin-left: 1rem;
  text-transform: uppercase;
  font-size: 14px;
  padding: 0 10px;
  font-weight: bold;
  &:hover {
    color: #ccc;
  }
`;
