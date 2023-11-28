import React from "react";
import classes from "../../style/itemCard.module.css";

const ItemCard = (props) => {
  const item = props.item;

  return (
    <div>
      <div className={classes.ctgList__productBox} key={item._id}>
        <div className={classes.ctgList__img}>
          <img src={`data:image/jpeg;base64,${item.img}`} alt="" />
        </div>
        <div className={classes.ctgList__info}>
          {item.desc && (
            <div className={classes.ctgList__info__itemDesc}>
              {Array.isArray(item.desc)
                ? `${item.desc[0]} | ${item.desc[1]} | ${item.desc[2]}`
                : item.desc}
            </div>
          )}

          <div className={classes.ctgList__info__title}>{item.name}</div>
          <div className={classes.ctgList__info__price}>
            <span className={classes.ctgList__price}>
              {item.price.toLocaleString()} 원
            </span>
            <span className={classes.ctgList__capacity}>{item.capacity}</span>
          </div>
          <span className={classes.ctgList__size}>
            +<strong>{item.quantity}</strong> Sizes
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
