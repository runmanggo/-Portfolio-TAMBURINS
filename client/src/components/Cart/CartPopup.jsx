import React, { useEffect } from "react";

import { NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import shortid from "shortid";

import classes from "./cartPopup.module.css";
import CartItems from "./CartItems";
import Modal from "../UI/Modal";

const CartPopup = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = cartItems.reduce(
    (sum, item) => sum + (item.isSelected ? item.price * item.quantity : 0),
    0
  );

  const location = useLocation();

  // 밑에서 상품 눌렀을 경우 위로 부드럽게 자동 스크롤
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [location.pathname]);

  return (
    <Modal show={props.show}>
      <div className={classes.cart__inner}>
        <div className={classes.cart__scroll}>
          <div className={classes.cart__title}>
            <span>장바구니</span> <br />
            장바구니는 격주 수요일 자정에 비워집니다.
          </div>
          <div className={classes.cart__list}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <div className={classes.cart__items} key={shortid.generate()}>
                  <CartItems item={item} />
                </div>
              ))
            ) : (
              <div className={classes.cart__items__txt}>
                장바구니에 담긴 상품이 없습니다
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={classes.total}>
        <div> 총 금액</div>
        <div> {total.toLocaleString()} 원</div>
      </div>
      <div className={classes.cart__btnWrap}>
        <NavLink to={"/cart"} className={classes.detail__btn__white}>
          <button type="button" className={classes.detail__btn__white}>
            주문 하기
          </button>
        </NavLink>
      </div>
    </Modal>
  );
};

export default CartPopup;
