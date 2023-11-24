import React from "react";
import { useDispatch } from "react-redux";
import classes from "./cartItems.module.css";
import {
  adjustItemQuantity,
  toggleItemSelection,
  removeItem,
} from "../../redux/cartSlice";

import { db, auth } from "../../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";

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

  const removeHandler = async () => {
    dispatch(removeItem({ itemId: item.itemId }));
    const uid = auth?.currentUser.uid;
    const docRef = doc(db, "carts", `${uid}_${item.itemId}`);
    await deleteDoc(docRef);
  };

  // 이미지
  let imgSrc;
  if (typeof item.capacityImg === "string") {
    imgSrc = item.capacityImg;
  } else if (
    Array.isArray(item.capacityImg) &&
    [302, 304, 306, 402, 404, 406, 806].includes(item.itemId)
  ) {
    imgSrc = item.capacityImg[1];
  } else if (Array.isArray(item.capacityImg)) {
    imgSrc = item.capacityImg[0];
  }

  // 용량
  let capacity;
  if (typeof item.capacity === "string") {
    capacity = item.capacity;
  } else if (
    Array.isArray(item.capacity) &&
    [302, 304, 306, 402, 404, 406, 806].includes(item.itemId)
  ) {
    capacity = item.capacity[1];
  } else if (Array.isArray(item.capacity)) {
    capacity = item.capacity[0];
  }

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
        <img src={imgSrc} alt="" className={classes.image} />
      </div>

      <div className={classes.cartItem__info}>
        <div className={classes.cartItem__info__product}>
          <div className={classes.cartItem__productName}>{item.name}</div>
          <div className={classes.cartItem__productPrice}>
            {(item.price * item.quantity).toLocaleString()} 원
          </div>
        </div>
        <div className={classes.cartItem__capacity}>{capacity}</div>
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
