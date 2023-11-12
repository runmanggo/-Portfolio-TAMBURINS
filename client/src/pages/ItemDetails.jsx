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

  const handleBtnClick = () => {
    setIsShown(!isShown);
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
                  <img src={Img1} alt="" />
                  <div>11</div>
                </li>
                <li>
                  <img src={Img1} alt="" />
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
              <button className={classes.detail__btn} onClick={handleBtnClick}>
                퍼퓸 더보기
              </button>
              <div
                style={{ display: isShown ? "none" : "block" }}
                className={classes.detail__info__ctg__summary}
              >
                <strong>탬버린즈 퍼퓸</strong>
                <br />
                탬버린즈가 찾아낸 규정되지 않은 아름다움. 시간이 흐르면서
                일어나는 다채로운 향의 변화를 느껴보세요. 세상에 흩어진 모든
                이야기에서 영감을 받은 감각적인 향이 단조로운 일상에 자유롭고
                새로운 리듬을 부여합니다.
                <br />
                <br />
                <strong>탬버린즈의 미학</strong>
                <br />
                직선적으로 느껴지는 날카로운 첫인상과 대비되는 부드러운 곡선의
                촉각적인 경험은 손끝으로 사물을 읽는 듯한 공감각적인 흥미로움을
                선사합니다.
              </div>
            </div>

            <button className={classes.cart__btn}>장바구니 담기</button>

            <div className={classes.accordian__container}>
              <Accordion title="Section 1">
                <p>This is the content for section 1.</p>
              </Accordion>
              <Accordion title="Section 2">
                <p>This is the content for section 2.</p>
              </Accordion>
              <Accordion title="Section 3">
                <p>This is the content for section 2.</p>
              </Accordion>
              <Accordion title="Section 3">
                <p>This is the content for section 4.</p>
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
