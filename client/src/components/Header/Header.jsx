import React, { useEffect, useState } from "react";
import classes from "./header.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

//이미지
import Cart from "../../assets/image/cart.svg";
import menu from "../../assets/image/menu.svg";
import CartWhite from "../../assets/image/cart_white.svg";
import MenuWhite from "../../assets/image/menu_white.svg";
import Search from "../../assets/image/search.svg";
import SearchWhite from "../../assets/image/search_white.svg";
import Close from "../../assets/image/close.svg";
import CloseWhite from "../../assets/image/close_white.svg";

//컴포넌트
import Sidebar from "./Sidebar/Sidebar";

import { useSelector } from "react-redux";

const left_link = [
  {
    path: "home",
    display: "TAMBURINS",
  },
  {
    path: "shop",
    display: "전체보기",
  },
  {
    path: "shop/bestSellers",
    display: "베스트셀러",
  },
  {
    path: "shop/giftSet",
    display: "선물추천",
  },
  {
    path: "store",
    display: "매장보기",
  },
];

const Header = (props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isTransparent, setIsTransparent] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [cartImgIndex, setcartImgIndex] = useState(Cart);

  const location = useLocation();
  const navigate = useNavigate();

  const isHome = location.pathname === "/home";

  useEffect(() => {
    setIsTransparent(isHome);
  }, [isHome]);

  useEffect(() => {
    const handleResize = () => {};
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navIsTransparent = isTransparent
    ? `${classes.header} ${classes.transparent}`
    : classes.header;

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      if (!showSidebar && props.cartIsShown) {
        props.showCartHandler();
      }
      setShowSidebar((prevShowSidebar) => !prevShowSidebar);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    if (!searchTerm.trim()) {
      return;
    }

    navigate(`/shop/search?query=${searchTerm}`);
    setSearchTerm("");
  };

  useEffect(() => {
    let icon;
    if (props.cartIsShown) {
      if (isHome) {
        icon = CloseWhite;
      } else {
        icon = Close;
      }
    } else {
      if (isHome) {
        icon = CartWhite;
      } else {
        icon = Cart;
      }
    }
    setcartImgIndex(icon);
  }, [props.cartIsShown, isHome]);

  const handleCartClick = () => {
    props.showCartHandler();
  };

  const onClose = () => setShowSidebar(false);

  const totalQuantity = useSelector((state) =>
    Object.values(state.cart.items).reduce(
      (sum, item) => sum + (item.isSelected ? Number(item.quantity) : 0),
      0
    )
  );

  return (
    <header className={navIsTransparent}>
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
            <li
              className={`${classes.searchForm__container} search-item`}
              style={{
                border: isHome
                  ? "1px solid var(--white)"
                  : "1px solid var(--black)",
              }}
            >
              <form
                className={classes.searchForm}
                id="searchForm"
                onSubmit={handleSearchSubmit}
              >
                <input
                  type="text"
                  id="searchInput"
                  placeholder="검색어를 입력해주세요"
                  onChange={handleSearchChange}
                  value={searchTerm}
                  className={isHome ? "homePlaceholder" : "otherPlaceholder"}
                />
                <button type="submit">
                  <img src={isTransparent ? SearchWhite : Search} alt="" />
                </button>
              </form>
            </li>
            <li className={classes.mypage}>
              <NavLink to="/mypage">마이페이지</NavLink>
            </li>
            <li className={classes.login}>
              <NavLink to="/login">로그인</NavLink>
            </li>
            <li>
              <img src={cartImgIndex} alt="" onClick={handleCartClick} />
              {cartImgIndex !== Close && cartImgIndex !== CloseWhite && (
                <span className={classes.badge}>{totalQuantity}</span>
              )}
            </li>
            <li>
              <img
                src={isTransparent ? MenuWhite : menu}
                alt=""
                className={classes.mobile__menu}
                onClick={toggleSidebar}
              />
            </li>
          </ul>
        </div>
        {showSidebar && <Sidebar showSidebar={showSidebar} onClose={onClose} />}
      </nav>
    </header>
  );
};

export default Header;
