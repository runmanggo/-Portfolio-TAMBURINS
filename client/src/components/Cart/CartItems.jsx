import React from "react";
import { useDispatch } from "react-redux";
import classes from "./cartItems.module.css";
import {
  adjustItemQuantity,
  toggleItemSelection,
  removeItem,
} from "../../redux/cartSlice";

const CartItems = (props) => {
  const dispatch = useDispatch();
  const item = props.item;

  const selectHandler = (event) => {
    const selectedQuantity = event.target.value;

    dispatch(
      adjustItemQuantity({
        itemId: item.itemId,
        quantity: selectedQuantity,
      })
    );
  };

  const removeHandler = () => {
    dispatch(removeItem({ itemId: item.itemId }));
  };

  return (
    <div className={classes.cartPopupItem}>
      <div className={classes.cartPopupColumn}>
        <span className={classes.checkboxItem}>
          <label htmlFor="itemCheckbox">
            <input
              type="checkbox"
              id="itemCheckbox"
              name="itemCheckbox"
              className={classes.checkboxInput}
              checked={item.isSelected}
              onChange={() => dispatch(toggleItemSelection(item.itemId))}
            />
          </label>
        </span>
      </div>

      <div className={classes.cartPopupColumn__thumb}>
        <img
          src={
            typeof item.capacityImg === "string"
              ? item.capacityImg
              : Array.isArray(item.capacityImg) &&
                [302, 304, 306, 402, 404, 406, 806].includes(item.itemId)
              ? item.capacityImg[1]
              : item.capacityImg[0]
          }
          alt=""
          className={classes.image}
        />
      </div>

      <div className={classes.cartItem__info}>
        <div className={classes.cartItem__info__product}>
          <div className={classes.cartItem__productName}>{item.name}</div>
          <div className={classes.cartItem__productPrice}>
            {(item.price * item.quantity).toLocaleString()} 원
          </div>
        </div>
        <div className={classes.cartItem__capacity}>
          {typeof item.capacity === "string"
            ? item.capacity
            : Array.isArray(item.capacity) &&
              [302, 304, 306, 402, 404, 406, 806].includes(item.itemId)
            ? item.capacity[1]
            : item.capacity[0]}
        </div>
        <div className={classes.cartItem__quantitySelect}>
          <select
            className={classes.select}
            value={item.quantity}
            onChange={selectHandler}
          >
            {[...Array(10).keys()].map((_, index) => (
              <option value={index + 1} key={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <button
            type="button"
            className={classes.deleteButton}
            onClick={removeHandler}
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
