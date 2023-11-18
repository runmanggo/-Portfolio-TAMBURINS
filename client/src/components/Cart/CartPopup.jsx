import React from "react";
import Modal from "../UI/Modal";

import classes from "./cartPopup.module.css";
import { Link, NavLink } from "react-router-dom";

import CartItems from "./CartItems";

const CartPopup = (props) => {
  return (
    <Modal show={props.show}>
      <div className={classes.cart__inner}>
        <div className={classes.cart__scroll}>
          <div className={classes.cart__title}>
            <span>장바구니</span>
          </div>
          <div className={classes.cart__list}>
            <div className={classes.cart__items}>
              <div className={classes.cart__items__txt}>
                장바구니에 담긴 상품이 없습니다
              </div>
              <CartItems />
              <CartItems />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.cart__btnWrap}>
        <button type="button" className={classes.detail__btn__white}>
          <NavLink to={"/cart"}>주문 하기</NavLink>
        </button>
      </div>
    </Modal>
  );
};

export default CartPopup;
