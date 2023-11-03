import React, { useState } from "react";
import classes from "./slidebar.module.css";
import { NavLink, useLocation } from "react-router-dom";

import Close from "../../../assets/image/close.svg";

const Sidebar = ({ showSidebar, onClose }) => {
  const [close, setClose] = useState(false);

  return (
    showSidebar && (
      <aside className={`${classes.aside} ${close ? classes.closed : ""}`}>
        <div className={classes.aside__inner}>
          <div className={classes.aside__close}>
            <img src={Close} alt="" onClick={onClose} />
          </div>

          <div className={classes.aside__display}>
            <div className={classes.aside__title}>
              <NavLink to="/shop" className="aside__link">
                제품 보기
              </NavLink>
            </div>
            <div className={classes.aside__menuBox}>
              <div className={classes.aside__content}>
                <ul>
                  <li>
                    <NavLink to="/shop/:category">베스트셀러</NavLink>
                  </li>
                  <li>
                    <NavLink to="/shop/:category">선물 추천</NavLink>
                  </li>
                  <li>
                    <NavLink to="/store">매장 보기</NavLink>
                  </li>
                </ul>
              </div>

              <div className={classes.aside__footer}>
                <ul>
                  <li>
                    <NavLink to="/login">로그인</NavLink>
                  </li>

                  <li>
                    <NavLink to="/mypage">문의하기</NavLink>
                  </li>

                  <li>
                    <NavLink to="/mypage">마이페이지</NavLink>
                  </li>

                  <li>
                    <select
                      className={classes.aside__select}
                      name=""
                      id="language-mobile"
                    >
                      <option value="KR">Shop in KR</option>
                      <option value="CN">CN</option>
                      <option value="EN">EN</option>
                    </select>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </aside>
    )
  );
};

export default Sidebar;
