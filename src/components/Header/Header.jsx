import React from "react";
import classes from "./header.module.css";
import { NavLink, useNavigate, Link } from "react-router-dom";

import Cart from "../../assets/image/cart.svg";

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
  return (
    <header className={classes.header}>
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
              <img src={Cart} alt="" />
              <span className={classes.badge}>1</span>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
