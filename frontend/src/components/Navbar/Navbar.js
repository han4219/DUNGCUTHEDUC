import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Message from "../LoadingError/Error.js";
import Loading from "../LoadingError/Loading.js";
import * as S from "./navbar.style.js";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const controlNavbar = () => {
    if (window.scrollY > 100) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

  const categoryList = useSelector((state) => state.categoryList);
  const { load, error, categories } = categoryList;

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, []);
  return (
    <S.Wrapper>
      <S.WrapperBoxNav1 className={show ? "" : "showNav"}>
        <S.WrapperNav>
          <S.HomeIcon to="/">
            <i class="fas fa-home"></i>
          </S.HomeIcon>
          {load ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            categories.map((item) => (
              <S.CategoryItem to={`/category/${item._id}`} key={item._id}>
                {item.name}
              </S.CategoryItem>
            ))
          )}
        </S.WrapperNav>
      </S.WrapperBoxNav1>
      <S.WrapperBoxNav2 className={show ? "showNav" : "hideNav"}>
        <S.WrapperNav2>
          <S.HomeIcon to="/">
            <i class="fas fa-home"></i>
          </S.HomeIcon>
          {load ? (
            <Loading />
          ) : error ? (
            <Message variant="alert-danger">{error}</Message>
          ) : (
            categories.map((item) => (
              <S.CategoryItem to={`/category/${item._id}`} key={item._id}>
                {item.name}
              </S.CategoryItem>
            ))
          )}
        </S.WrapperNav2>
      </S.WrapperBoxNav2>
    </S.Wrapper>
  );
};

export default Navbar;
