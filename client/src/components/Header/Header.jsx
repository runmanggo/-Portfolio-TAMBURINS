import React, { useEffect, useState } from "react";
import classes from "./header.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

//이미지
import Cart from "../../assets/image/cart.svg";
import menu from "../../assets/image/menu.svg";
import CartWhite from "../../assets/image/cart_white.svg";
import MenuWhite from "../../assets/image/menu_white.svg";
import Search from "../../assets/image/search.svg";

//컴포넌트
import Sidebar from "./Sidebar/Sidebar";

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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsTransparent(location.pathname === "/home");
  }, [location]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
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
      setShowSidebar((prevShowSidebar) => !prevShowSidebar);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    navigate(`/shop/search?query=${searchTerm}`);
    setSearchTerm("");
  };

  const onClose = () => setShowSidebar(false);

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
            <li className={classes.searchForm__container}>
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
                />
                <button type="submit">
                  <img src={Search} alt="" />
                </button>
              </form>
            </li>

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
