import React, { useEffect, useRef, useState } from "react";
import classes from "./header.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.config";

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
import Sidebar from "../Sidebar/Sidebar";

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { clearCart } from "../../redux/cartSlice";

import { RootState } from "model/rootState";

import shortid from "shortid";

interface Props {
  cartIsShown: boolean;
  showCartHandler: () => void;
  closeCartHandler: () => void;
}

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
    path: "",
    display: "매장보기",
  },
];

const Header = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isTransparent, setIsTransparent] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  // 카트 팝업 열릴 경우 카트아이콘, 닫아야할때는 close아이콘으로 순차적으로 처리
  const [cartImgIndex, setcartImgIndex] = useState<string>(Cart);
  // 로그인 상태 가져오기
  const isLoggedIn = useSelector((state: RootState) => state.auth.loggedIn);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  //현 위치가 /home인지 확인하기
  const isHome = location.pathname === "/home";

  //주소가 /home일 경우 해더 투명으로 변경
  useEffect(() => {
    setIsTransparent(isHome);
  }, [isHome]);

  // 유저의 화면 크기 확인하기 위해 : /home 메인 이미지가 유저 화면 크기에 맞게 나오게 하려고
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

  // 화면크기 1024px 아허일 경우 사이드바 나오겠금
  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      if (!showSidebar && props.cartIsShown) {
        props.showCartHandler();
      }
      setShowSidebar((prevShowSidebar) => !prevShowSidebar);
    }
  };

  // 검색
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 검색창에 빈값일 경우 아무것도 나오지 않도록
    if (!searchTerm.trim()) {
      return;
    }
    //검색어가 있을 경우
    navigate(`/shop/search?query=${searchTerm}`);
    setSearchTerm("");
  };

  // 주소가 /home일 경우 하얀색 아이콘 사용하기 위해
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

  // 카트 팝업
  const cartRef = useRef<HTMLImageElement>(null);
  const { closeCartHandler, cartIsShown: isOpen, showCartHandler } = props;

  // 카트 아이콘의 순서에 Close,CloseWhite 아니면 카트 열리게
  const handleCartClick = (event: any) => {
    event.stopPropagation();
    if (cartImgIndex !== Close && cartImgIndex !== CloseWhite) {
      showCartHandler();
    }
  };

  // 카트 팝업닫기
  const handleImgChange = (event: React.MouseEvent<HTMLImageElement>) => {
    if (cartImgIndex === Close || cartImgIndex === CloseWhite) {
      event.stopPropagation();
      closeCartHandler();
    } else {
      handleCartClick(event);
    }
  };

  // 장바구니가 열려 있는 상태(isOpen)에서만 외부 클릭을 감지하며,
  // 클릭된 위치가 장바구니(cartRef.current)를 포함하고 있지 않다면 장바구니 닫기
  useEffect(() => {
    const handleOutsideClick = (event: any) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        closeCartHandler();
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, closeCartHandler]);

  const onClose = () => setShowSidebar(false);

  const totalQuantity = useSelector((state: RootState) =>
    Object.values(state.cart.items).reduce(
      (sum, item) => sum + (item.isSelected ? Number(item.quantity) : 0),
      0
    )
  );

  //로그아웃
  const handleLogout = () => {
    auth.signOut().then(() => {
      dispatch(logout());
      dispatch(clearCart());
      navigate("/home");
    });
  };

  return (
    <header className={navIsTransparent}>
      <nav>
        <div>
          <ul className={classes.left}>
            {left_link.map((link) => (
              <li key={shortid.generate()}>
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
            <li className={classes.mypage}>마이페이지</li>
            {isLoggedIn ? (
              <li className={classes.login} onClick={handleLogout}>
                로그아웃
              </li>
            ) : (
              <li className={classes.login}>
                <NavLink to="/login">로그인</NavLink>
              </li>
            )}
            <li>
              <img
                src={cartImgIndex}
                ref={cartRef}
                alt=""
                onClick={handleImgChange}
              />
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
