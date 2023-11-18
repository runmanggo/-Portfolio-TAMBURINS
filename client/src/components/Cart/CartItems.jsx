import React from "react";

import classes from "./cartItems.module.css";

import Imgg from "../../assets/image/perfume_chamo_50ml_4_v2.jpg";

const CartItems = () => {
  return (
    <div className={classes.cartPopupItem}>
      <div className={classes.cartPopupColumn}>
        <span className={classes.checkboxItem}>
          <input
            type="checkbox"
            id="cartSno"
            name="cartSno"
            className={classes.checkboxInput}
            defaultChecked
          />
          <span className={classes.checkboxShape}></span>
          <label htmlFor="cartSno" className={classes.checkboxLabel}></label>
        </span>
      </div>

      <div className={classes.cartPopupColumn__thumb}>
        <img src={Imgg} alt="" className={classes.image} />
      </div>

      <div className={classes.cartItem__info}>
        <div className={classes.cartItem__info__product}>
          <div className={classes.cartItem__productName}>퍼퓸 카모</div>
          <div className={classes.cartItem__productPrice}>1800</div>
        </div>
        <div className={classes.cartItem__quantitySelect}>
          <select className={classes.select}>
            <option value="1" key="1" selected>
              1
            </option>
          </select>
          <button type="button" className={classes.deleteButton}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
