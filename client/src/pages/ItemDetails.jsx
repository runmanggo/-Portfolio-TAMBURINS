import React, { useState } from "react";
import classes from "../style/itemDetail.module.css";

import Accordion from "../components/UI/Accordion";
import { CtgLsitContainer } from "../style/StyledComponents";
import ItemCard from "../components/UI/ItemCard";

import Img1 from "../assets/image/best_perfume_chamo_10ml.jpg";

const products = [
  {
    id: "1662465136",
    img: Img1,
    desc: "퍼퓸의 10가지 향",
    name: "퍼퓸 디스커버리 세트",
    price: "품절",
    sizes: "2",
  },
  {
    id: "1662465136",
    img: Img1,
    desc: "퍼퓸의 10가지 향",
    name: "퍼퓸 디스커버리 세트",
    price: "품절",
    sizes: "2",
  },
  {
    id: "1662465136",
    img: Img1,
    desc: "퍼퓸의 10가지 향",
    name: "퍼퓸 디스커버리 세트",
    price: "품절",
    sizes: "2",
  },
  {
    id: "1662465136",
    img: Img1,
    desc: "퍼퓸의 10가지 향",
    name: "퍼퓸 디스커버리 세트",
    price: "품절",
    sizes: "2",
  },
];

const ItemDetails = () => {
  const [isShown, setIsShown] = useState(true);

  const [isActive, setIsActive] = useState(false);

  const handleBtnClick = () => {
    setIsShown(!isShown);
  };

  const handleClick = () => {
    setIsActive(!isActive);
  };
  return (
    <>
      <div className={classes.detail__content}>
        <div className={classes.detail__imgs}>
          <div className={classes.detail__imgs__container}>
            <div className={classes.detail__imgs__wrapper}>
              <img src={Img1} alt="" />
              <img src={Img1} alt="" />
              <img src={Img1} alt="" />
              <img src={Img1} alt="" />
            </div>
          </div>
        </div>

        <div className={classes.product__info}>
          <div className={classes.product__info__inner}>
            <div className={classes.item__ctg}>퍼퓸</div>
            <div className={classes.item__ctg__info}>
              <div className={classes.item__ctg__info__title}>퍼퓸 카모</div>
              <div className={classes.item__ctg__info__price}>139,000 원</div>
            </div>

            <div className={classes.product__sizeBox}>
              <ul className={classes.product__size}>
                <li>
                  <div className={classes.product__size__border}>
                    <img src={Img1} alt="" />
                  </div>
                  <div>11</div>
                </li>
                <li>
                  <div className={classes.product__size__border}>
                    <img src={Img1} alt="" />
                  </div>
                  <div>11</div>
                </li>
              </ul>
            </div>

            <div className={classes.detail__info}>
              <div className={classes.detail__info__desc}>
                진득한 카모마일 | 부드러운 나무결 | 머스크
              </div>
              <div className={classes.detail__info__summary}>
                꿀처럼 진득하고 달콤한 카모마일과 씁쓸한 클라리세이지의 허브
                향이 오묘한 조화를 이루어 중독성 있는 향을 선사합니다. 자칫
                차갑게 느껴질 수 있는 촉촉한 이끼의 느낌을 우아하고 부드러운
                나무결의 블론드 우드와 따뜻한 머스크로 감싸주어 당신의 지친
                마음에 특별하고 작은 위안을 선물합니다.
              </div>
              <button
                style={{ display: isShown ? "block" : "none" }}
                className={classes.detail__btn}
                onClick={handleBtnClick}
              >
                퍼퓸 더보기
              </button>
              <div
                style={{ display: isShown ? "none" : "block" }}
                className={classes.detail__info__ctg__summary}
              >
                <div>
                  <span>탬버린즈 퍼퓸</span>
                  <p className={classes.detail__info__ctg__summary__p}>
                    탬버린즈가 찾아낸 규정되지 않은 아름다움. 시간이 흐르면서
                    일어나는 다채로운 향의 변화를 느껴보세요. 세상에 흩어진 모든
                    이야기에서 영감을 받은 감각적인 향이 단조로운 일상에
                    자유롭고 새로운 리듬을 부여합니다.
                  </p>
                </div>
                <div>
                  <span>탬버린즈의 미학</span>
                  <p>
                    직선적으로 느껴지는 날카로운 첫인상과 대비되는 부드러운
                    곡선의 촉각적인 경험은 손끝으로 사물을 읽는 듯한 공감각적인
                    흥미로움을 선사합니다.
                  </p>
                </div>
              </div>
            </div>

            <button className={classes.cart__btn}>장바구니 담기</button>

            <div className={classes.accordian__container}>
              <Accordion title="Section 1">
                This is the content for section 1.
              </Accordion>
              <Accordion title="온라인 익스클루시브 혜택">
                <div>
                  온라인 익스클루시브 혜택 탬버린즈는 고객님들께 빠른 배송 및
                  반품과 최고의 경험을 제공하기 위해 언제나 세심한 주의를
                  기울입니다. 고객님을 위한 익스클루시브 서비스를 경험해보세요.
                </div>
                <br />
                <div>
                  · 회원가입 및 카카오톡 플러스 친구 추가 시 바로 사용 가능한
                  3,000원 혜택
                </div>
                <div>· 구매 금액의 2% 적립 </div>
                <div>
                  · 생일 축하 5,000 포인트 혜택 (1년 이내 구매 이력 있을 시)
                </div>
              </Accordion>
              <Accordion title="Section 3">
                This is the content for section 2.
              </Accordion>
              <Accordion title="배송 & 반품">
                <div>3만원 이상 구매하실 경우 배송 비용은 무료입니다.</div>
                <br />
                <div style={{ color: "red" }}>
                  <strong>주문일로부터 1-2 영업일 이내 출고됩니다.</strong>
                </div>
                <br />
                <div>
                  배송은 지역 택배사 사정에 따라 약간의 지연이 생길 수 있습니다.
                  배송이 시작되면 구매자에게는 이메일, 수령인에게는 카카오
                  알림톡으로 배송 정보를 전송해 드립니다.
                  <br />
                  CJ대한통운(https://www.cjlogistics.com) <br />
                </div>
                <br />
                *상품 혹은 증정품의 포장(랩핑)을 개봉 및 훼손한 경우 반품이
                불가합니다.
                <br /> *단순 변심 또는 주문 실수로 인한 교환이 불가합니다.
                신중한 구매 부탁드립니다.
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div className={classes.recommend}>
        <CtgLsitContainer>
          {products.map((item, index) => (
            <ItemCard key={index} item={item} />
          ))}
        </CtgLsitContainer>
      </div>
    </>
  );
};

export default ItemDetails;
