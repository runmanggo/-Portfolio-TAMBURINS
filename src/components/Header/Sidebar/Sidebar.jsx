import React from "react";
import classes from "./slidebar.module.css";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className={classes.aside}>
      <div className={classes.aside__inner}>
        <div className={classes.aside__display}>
          <div className={classes.aside__menuBox}>
            <ul>
              <li className="aside__item aside__title">
                <NavLink to="/shop" className="aside__link">
                  제품 보기
                </NavLink>
              </li>
            </ul>
          </div>
          <div className={classes.aside__content}>
            <ul>
              <li className="aside__item aside__item--m">
                <NavLink to="/shop/:category">베스트셀러</NavLink>
              </li>
              <li className="aside__item aside__item--m">
                <NavLink to="/shop/:category">선물 추천</NavLink>
              </li>
              <li className="aside__item aside__item--m">
                <NavLink to="/store">매장 보기</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="aside__content aside__content--footer">
          <ul>
            <li className="aside__item aside__item--s">
              <NavLink to="/login">로그인</NavLink>
            </li>

            <li className="aside__item aside__item--s">
              <NavLink to="/mypage">문의하기</NavLink>
            </li>

            <li className="aside__item aside__item--s">
              <NavLink to="/mypage">마이페이지</NavLink>
            </li>
            <li className="aside__item aside__item--s">
              <select className="aside__select" name="" id="language-mobile">
                <option value="KR">Shop in KR</option>
                <option value="CN">CN</option>
                <option value="EN">EN</option>
              </select>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
