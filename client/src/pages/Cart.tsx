import { useSelector } from "react-redux";
import classes from "../style/cart.module.css";
import shortid from "shortid";

import CartItems from "../components/Cart/CartItems";
import { NavLink } from "react-router-dom";

import { RootState } from "model/rootState";

const Cart = () => {
  // 카트슬라이스에서 item을 가져와서 카트에 상품이 변경될때마다 컴포넌트 자동 업데이트,
  // 사용자에게 최신의 카트 보여줄 수 있음
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const total = cartItems.reduce(
    (sum, item) => sum + (item.isSelected ? item.price * item.quantity : 0),
    0
  );

  return (
    <main>
      <div className={classes.cart__container}>
        <section className={classes.cart__container__left}>
          <div className={classes.left__title}>
            쇼핑백
            <br />
            <span>쇼핑백은 격주 수요일 자정에 비워집니다.</span>
          </div>
          {cartItems.length > 0 ? (
            <div className={classes.left__list}>
              {cartItems.map((item) => (
                <CartItems
                  key={shortid.generate()}
                  item={item}
                  className={classes.cartItems}
                />
              ))}
            </div>
          ) : (
            <div className={classes.left__list__zero}>
              쇼핑백에 담긴 상품이 없습니다.
            </div>
          )}
        </section>

        <section className={classes.cart__container__right}>
          <h2 className={classes.right__title}>결제내역</h2>
          <div className={classes.right__priceGroup}>
            <div className={classes.right__priceRow}>
              <div className={classes.right___priceLabel}>주문 금액</div>
              <div className={classes.right__priceValue}>
                {total.toLocaleString()} 원
              </div>
            </div>
            <div className={classes.right__priceRow}>
              <div className={classes.right__priceLabel}>배송비</div>
              <div className={classes.right__priceValue}>
                <span className={classes.right__priceNoti}>
                  3만원 이상 구매 시 무료배송
                </span>
                {(total >= 30000 ? 0 : 3000).toLocaleString()} 원
              </div>
            </div>

            <div className={classes.right__total}>
              <div className={classes.right__priceLabel}>총 금액</div>
              <div className={classes.right__priceValue}>
                {total.toLocaleString()} 원
              </div>
            </div>
          </div>
          <div className={classes.common__btnWrapper}>
            <button type="button" className={classes.btnContinue}>
              주문 계속하기
            </button>
            <button type="button" className={classes.btnShopping}>
              <NavLink to={"/shop"}>쇼핑 계속하기</NavLink>
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
    </main>
  );
};

export default Cart;
