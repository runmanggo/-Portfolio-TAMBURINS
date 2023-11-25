import React, { Fragment } from "react";
import classes from "./sidebar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

import Close from "../../assets/image/close.svg";
import Overlay from "../UI/Overlay";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice.js";
import { getAuth } from "firebase/auth";
import { clearCart } from "../../redux/cartSlice";

const Sidebar = (props) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 다른 페이지로 넘어갈때 사이드바 자동 닫힘
  const handleLinkClick = () => {
    props.onClose();
  };

  //로그아웃
  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      dispatch(logout());
      dispatch(clearCart());
      navigate("/home");
    });
  };

  return (
    <Fragment>
      {props.showSidebar && <Overlay onClick={props.onClose} />}
      {props.showSidebar && (
        <aside className={classes.aside}>
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
                    <li>매장 보기</li>
                  </ul>
                </div>

                <div className={classes.aside__footer}>
                  <ul>
                    {isLoggedIn ? (
                      <li>
                        <NavLink onClick={handleLogout}>로그아웃</NavLink>
                      </li>
                    ) : (
                      <li className={classes.login}>
                        <NavLink to="/login" onClick={handleLinkClick}>
                          로그인
                        </NavLink>
                      </li>
                    )}
                    <li>문의하기</li>

                    <li>마이페이지</li>
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
