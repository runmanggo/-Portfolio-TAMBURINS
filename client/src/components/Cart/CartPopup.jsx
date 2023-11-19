import React from "react";
import Modal from "../UI/Modal";

import classes from "./cartPopup.module.css";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import shortid from "shortid";

import CartItems from "./CartItems";

const CartPopup = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const total = Object.values(cartItems).reduce(
    (sum, item) => sum + (item.isSelected ? item.price * item.quantity : 0),
    0
  );

  return (
    <div id="cart">
      <Modal show={props.show}>
        <div className={classes.cart__inner}>
          <div className={classes.cart__scroll}>
            <div className={classes.cart__title}>
              <span>장바구니</span>
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
          <button type="button" className={classes.detail__btn__white}>
            <NavLink to={"/cart"}>주문 하기</NavLink>
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CartPopup;
