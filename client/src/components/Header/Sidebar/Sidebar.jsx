import React, { Fragment, useState } from "react";
import classes from "./sidebar.module.css";
import { NavLink } from "react-router-dom";

import Close from "../../../assets/image/close.svg";

import Overlay from "../../UI/Overlay";

const Sidebar = (props) => {
  const [close, setClose] = useState(false);

  const handleLinkClick = () => {
    props.onClose();
  };

  return (
    <Fragment>
      {props.showSidebar && <Overlay onClick={props.onClose} />}
      {props.showSidebar && (
        <aside className={`${classes.aside} ${close ? classes.closed : ""}`}>
          <div className={classes.aside__inner}>
            <div className={classes.aside__close}>
              <img src={Close} alt="" onClick={props.onClose} />
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
                      <NavLink to="/shop/bestSellers" onClick={handleLinkClick}>
                        베스트셀러
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/shop/giftSet" onClick={handleLinkClick}>
                        선물 추천
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/store" onClick={handleLinkClick}>
                        매장 보기
                      </NavLink>
                    </li>
                  </ul>
                </div>

                <div className={classes.aside__footer}>
                  <ul>
                    <li>
                      <NavLink to="/login" onClick={handleLinkClick}>
                        로그인
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/mypage" onClick={handleLinkClick}>
                        문의하기
                      </NavLink>
                    </li>

                    <li>
                      <NavLink to="/mypage" onClick={handleLinkClick}>
                        마이페이지
                      </NavLink>
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
      )}
    </Fragment>
  );
};

export default Sidebar;
