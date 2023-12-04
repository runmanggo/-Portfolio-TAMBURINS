import { FC } from "react";
import { useDispatch } from "react-redux";
import classes from "./cartItems.module.css";
import {
  adjustItemQuantity,
  toggleItemSelection,
  removeItem,
} from "../../redux/cartSlice";

import { db, auth } from "../../firebase.config";
import { doc, deleteDoc } from "firebase/firestore";

import { CartItem } from "model/cartItem";

import shortid from "shortid";

type Props = {
  item: CartItem;
};

const CartItems: FC<Props> = (props) => {
  const item = props.item;
  const dispatch = useDispatch();

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedQuantity = event.target.value;

    dispatch(
      adjustItemQuantity({
        itemId: item.itemId,
        quantity: selectedQuantity,
      })
    );
  };

  function getGuestId() {
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = shortid.generate(); // 고유 ID 생성 함수
      localStorage.setItem("guestId", guestId);
    }
    return guestId;
  }

  // 유저가 카트에 상품 담으면 저장된후, 카트에서 삭제하면 파이어베이스에서도 삭제
  const removeHandler = async () => {
    dispatch(removeItem({ itemId: item.itemId }));

    if (auth.currentUser) {
      // 회원인 경우 파이어베이스에서 항목 삭제
      const uid = auth.currentUser.uid;
      const docRef = doc(db, "carts", `${uid}_${item.itemId}`);
      await deleteDoc(docRef);
    } else {
      // 비회원인 경우 로컬 스토리지에서 항목 삭제
      const uid = getGuestId();
      const cartData = localStorage.getItem("cart");
      let cart: CartItem[] = cartData ? JSON.parse(cartData) : [];
      const index = cart.findIndex(
        (cartItem: CartItem) =>
          Number(cartItem.itemId) === Number(item.itemId) &&
          cartItem.uid === uid
      );

      if (index !== -1) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
      }
    }
  };

  // 용량에 따른 이미지 변경
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

  // 용량에따른 텍스트 변경
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
        <img
          src={`data:image/jpeg;base64,${imgSrc}`}
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
        <div className={classes.cartItem__capacity}>{capacity}</div>
        <div className={classes.cartItem__quantitySelect}>
          <select
            className={classes.select}
            value={item.quantity}
            onChange={selectHandler}
          >
            {[...Array(10).keys()].map((index) => (
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
