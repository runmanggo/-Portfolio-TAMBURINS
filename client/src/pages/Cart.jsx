import React from "react";
import { useSelector } from "react-redux";
import classes from "../style/cart.module.css";

import CartItems from "../components/Cart/CartItems";

const Cart = () => {
  const items = useSelector((state) => state.cart.items);
  return (
    <mian>
      <div className={classes.cart__container}>
        <section className={classes.cart__container__left}>
          <div className={classes.left__title}>쇼핑백</div>
          <div className={classes.left__list}>
            {items.map((item) => (
              <CartItems key={item.itemId} item={item} />
            ))}
          </div>
        </section>

        <section className={classes.cart__container__right}>
          <h2 className={classes.right__title}>결제내역</h2>
          <div className={classes.right__priceGroup}>
            <div className={classes.right__priceRow}>
              <div className={classes.right___priceLabel}>주문 금액</div>
              <div className={classes.right__priceValue}>46,500 원</div>
            </div>
            <div className={classes.right__priceRow}>
              <div className={classes.right__priceLabel}>배송비</div>
              <div className={classes.right__priceValue}>
                <span className={classes.right__priceNoti}>
                  3만원 이상 구매 시 무료배송
                </span>
                0원
              </div>
            </div>

            <div className={classes.right__total}>
              <div className={classes.right__priceLabel}>총 금액</div>
              <div className={classes.right__priceValue}>46,500원</div>
            </div>
          </div>
          <div className={classes.common__btnWrapper}>
            <button type="button" className={classes.btnContinue}>
              주문 계속하기
            </button>
            <button type="button" className={classes.btnShopping}>
              쇼핑 계속하기
            </button>
          </div>
          <div className={classes.right____infoGroup}>
            <ul className={classes.notificationList}>
              <li className={classes.colorRed}>
                주문일로부터 출고까지 1-2일 가량 소요되고 있습니다.
              </li>
              <li className={classes.colorRed}>
                환경부 고시에 따라, 기본 쇼핑백이 제공되지 않습니다.
              </li>
            </ul>
          </div>
        </section>
      </div>
    </mian>
  );
};

export default Cart;
