import React, { useEffect, useState } from "react";
import classes from "./header.module.css";
import { NavLink, useLocation } from "react-router-dom";

//이미지
import Cart from "../../assets/image/cart.svg";
import menu from "../../assets/image/menu.svg";
import CartWhite from "../../assets/image/cart_white.svg";
import MenuWhite from "../../assets/image/menu_white.svg";

//컴포넌트
import Sidebar from "./Sidebar/Sidebar";

const left_link = [
  {
    path: "home",
    display: "TAMBURINS",
  },
  {
    path: "shop",
    display: "제품보기",
  },
  {
    path: "shop/:category",
    display: "베스트셀러",
  },
  {
    path: "shop/:category",
    display: "선물추천",
  },
  {
    path: "store",
    display: "매장보기",
  },
];

const Header = () => {
  const location = useLocation();
  const [isTransparent, setIsTransparent] = useState(false);

  useEffect(() => {
    setIsTransparent(location.pathname === "/home");
  }, [location]);

  const navClass = isTransparent
    ? `${classes.header} ${classes.transparent}`
    : classes.header;

  const isWindowSizeLessThan1024 = window.innerWidth < 1024;

  return (
    <header className={navClass}>
      <nav>
        <div>
          <ul className={classes.left}>
            {left_link.map((link, index) => (
              <li key={index}>
                <NavLink to={link.path}>{link.display}</NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className={classes.right}>
            <li>Shop in KR</li>
            <li>
              <NavLink to="/mypage">마이페이지</NavLink>
            </li>
            <li>
              <NavLink to="/login">로그인</NavLink>
            </li>
            <li>
              <img src={isTransparent ? CartWhite : Cart} alt="" />
              <span className={classes.badge}>1</span>
            </li>
            <li>
              <img
                src={isTransparent ? MenuWhite : menu}
                alt=""
                className={classes.mobile__menu}
              />
            </li>
          </ul>
        </div>
        {/* {isWindowSizeLessThan1024 && <Sidebar />} */}
      </nav>
    </header>
  );
};

export default Header;
