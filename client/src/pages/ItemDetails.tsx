import React, { useState, useEffect } from "react";
import classes from "../style/itemDetail.module.css";

//컴포넌트
import Accordion from "../components/UI/Accordion";
import { CtgLsitContainer } from "../components/StyledComponents/ctgLsitContainer";
import { CommonBtn } from "../components/StyledComponents/commonBtn";
import ItemCard from "../components/UI/ItemCard";
import SliderItems from "../components/SliderItems/SliderItems";

import { useParams, NavLink, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//데이터 api
import { useFetchData } from "../services/useFetchData";
import { API } from "../services/api.config";
import { fetchDetailId as fetchDetail } from "../services/fetchDetail";

import { useDispatch } from "react-redux";
import { addItemToCart } from "../redux/cartSlice";
import { db, auth } from "../firebase.config";
import { doc, setDoc } from "firebase/firestore";

import shortid from "shortid";
import debounce from "lodash.debounce";

import { ItemsDetail } from "model/itemsDetail";
import { MainItems } from "model/mainItems";
import { CartItem } from "model/cartItem";

//랜덤 추천 상품을 위한 Fisher-Yates 셔플 알고리즘
function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

const ItemDetails = () => {
  const [isShown, setIsShown] = useState<boolean>(true);
  const [randomScent, setRandomScent] = useState([]);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();

  const {
    data: detail,
    isLoading: isLoadingDetail,
    error: detailError,
  } = useQuery<ItemsDetail, Error>({
    queryKey: ["detail", id],
    queryFn: () => fetchDetail(Number(id)),
  });

  const fetchScent = useFetchData(API.ITEMS);
  const {
    data: scent,
    isLoading: isLoadingScent,
    error: scentError,
  } = useQuery({ queryKey: ["scent"], queryFn: fetchScent });

  useEffect(() => {
    if (isLoadingDetail || isLoadingScent) return;
    if (detailError || scentError) {
      let errorMessage = "";
      if (detailError) {
        errorMessage += detailError.message;
      }
      if (scentError) {
        errorMessage += scentError.message;
      }
      console.error(errorMessage);
      return;
    }

    const random = shuffleArray(scent).slice(0, 4);

    setRandomScent(random);
  }, [isLoadingDetail, isLoadingScent, detailError, scentError, scent]);

  // 상품 더보기 버튼
  const handleBtnClick = () => {
    setIsShown(!isShown);
  };

  function getGuestId() {
    let guestId = localStorage.getItem("guestId");
    if (!guestId) {
      guestId = shortid.generate(); // 고유 ID 생성 함수
      localStorage.setItem("guestId", guestId);
    }
    return guestId;
  }

  // 상품 담았을시 파이어베이스로 저장되게
  const handleAddToCart = async (detail: CartItem | undefined) => {
    if (!detail) {
      return;
    }

    dispatch(addItemToCart(detail));

    const uid = auth.currentUser ? auth.currentUser.uid : getGuestId();
    const itemId = detail.itemId;
    const quantity = 1;

    const cartItem = {
      uid: uid,
      itemId: itemId,
      quantity: quantity,
      price: detail.price,
      name: detail.name,
      capacity: detail.capacity,
      capacityImg: detail.capacityImg,
      isSelected: true,
    };

    // 회원인 경우 장바구니 아이템을 파이어베이스에 저장
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, "carts", `${uid}_${itemId}`), cartItem);
      } catch (e) {
        console.error("Error writing document: ", e);
      }
    }
    // 비회원인 경우 로컬 스토리지에 데이터를 저장
    else {
      let cartItems: any = localStorage.getItem("cart");
      let cart = JSON.parse(cartItems) || [];
      cart.push(cartItem);
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const handleClick = (detail: CartItem | undefined) => {
    return async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      if (detail) {
        await handleAddToCart(detail);
      }
    };
  };

  // 화면 사이즈
  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 300);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 밑에서 상품 눌렀을 경우 위로 부드럽게 자동 스크롤
  useEffect(() => {
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }, [location.pathname]);

  return (
    <>
      {detail && (
        <div className={classes.detail__content}>
          {/* 상세페이지 메인 이미지 1024px 이하일때 스와이프로 변하게 */}
          {windowWidth < 1024 ? (
            <SliderItems />
          ) : (
            <div className={classes.detail__imgs}>
              <div className={classes.detail__imgs__wrapper}>
                {Array.isArray(detail.mainImg) ? (
                  detail.mainImg.map((mainImg, index) => (
                    <div key={shortid.generate()}>
                      {mainImg === detail.mainVideo ? (
                        <video>
                          <source src={mainImg} type="video/mp4" />
                        </video>
                      ) : (
                        <img
                          src={`data:image/jpeg;base64,${mainImg}`}
                          alt={`mainImg ${index}`}
                        />
                      )}
                    </div>
                  ))
                ) : (
                  <div>
                    {detail.mainImg === detail.mainVideo || !detail.mainImg ? (
                      <video loop muted autoPlay>
                        <source src={detail.mainVideo} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        src={`data:image/jpeg;base64,${detail.mainImg}`}
                        alt="mainImg"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={classes.product__info}>
            <div className={classes.product__info__inner}>
              <div className={classes.item__ctg}>
                <NavLink to={`/shop/${detail.category}`}>
                  {detail.title}
                </NavLink>
              </div>
              <div className={classes.item__ctg__info}>
                <div className={classes.item__ctg__info__title}>
                  {detail.name}
                </div>
                <div className={classes.item__ctg__info__price}>
                  {detail.price.toLocaleString()} 원
                </div>
              </div>
              {/* 상품 사이즈에 따른 조건부 */}
              <div className={classes.product__sizeBox}>
                <ul className={classes.product__size}>
                  {Array.isArray(detail.capacityImg) ? (
                    detail.capacityImg.map((capImg, index) => (
                      <li key={shortid.generate()}>
                        {Array.isArray(detail.capacityLink) &&
                        detail.capacityLink[index] ? (
                          <NavLink to={detail.capacityLink[index]}>
                            <div
                              className={
                                location.pathname === detail.capacityLink[index]
                                  ? classes.product__size__border__active
                                  : classes.product__size__border
                              }
                            >
                              <img
                                src={`data:image/jpeg;base64,${capImg}`}
                                alt={`capacity ${index}`}
                              />
                            </div>
                          </NavLink>
                        ) : (
                          <div className={classes.product__size__border}>
                            <img
                              src={`data:image/jpeg;base64,${capImg}`}
                              alt={`capacity ${index}`}
                            />
                          </div>
                        )}
                        <div>
                          {Array.isArray(detail.capacity)
                            ? detail.capacity[index]
                            : detail.capacity}
                        </div>
                      </li>
                    ))
                  ) : (
                    <li>
                      <div className={classes.product__size__border__active}>
                        <img
                          src={`data:image/jpeg;base64,${detail.capacityImg}`}
                          alt="capacityImg"
                        />
                      </div>
                      <div>{detail.capacity}</div>
                    </li>
                  )}
                </ul>
              </div>

              {/* 상품 더보기 버튼 관련 조건부 */}
              <div className={classes.detail__info}>
                <div className={classes.detail__info__desc}>
                  {Array.isArray(detail.itemKeyWord) ? (
                    detail.itemKeyWord.join(" | ")
                  ) : (
                    <span className={classes.itemKeyWord}>
                      {detail.itemKeyWord}
                    </span>
                  )}
                </div>
                <div className={classes.detail__info__desc}>
                  {Array.isArray(detail.infoSummary) ? (
                    detail.infoSummary.map((desc, index) => (
                      <div key={shortid.generate()}>
                        {Array.isArray(desc)
                          ? desc.map((text, subIndex) => (
                              <div key={`${index}-${subIndex}`}>{text}</div>
                            ))
                          : desc}
                      </div>
                    ))
                  ) : (
                    <div>{detail.infoSummary}</div>
                  )}
                </div>
                {detail.detailBtn && (
                  <>
                    <button
                      style={{ display: isShown ? "block" : "none" }}
                      className={classes.detail__btn}
                      onClick={handleBtnClick}
                    >
                      {detail.detailBtn} 더보기
                    </button>
                    <div
                      style={{ display: isShown ? "none" : "block" }}
                      className={classes.detail__info__ctg__summary}
                    >
                      {Array.isArray(detail.detailBtnDesc) ? (
                        detail.detailBtnDesc.map((desc) => (
                          <div key={shortid.generate()}>
                            {Array.isArray(desc) ? (
                              desc.map((text) => (
                                <div key={shortid.generate()}>{text}</div>
                              ))
                            ) : (
                              <div>{desc}</div>
                            )}
                          </div>
                        ))
                      ) : (
                        <div>{detail.detailBtnDesc}</div>
                      )}
                    </div>
                  </>
                )}
              </div>

              <CommonBtn
                className={classes.cart__btn}
                onClick={handleClick(detail)}
              >
                장바구니 담기
              </CommonBtn>

              {/* 아코디언 첫번째 */}
              <div className={classes.accordian__container}>
                {Array.isArray(detail.accordion1) &&
                  detail.accordion1.length !== 0 &&
                  detail.accordion1[0] !== "" && (
                    <Accordion title="향 노트">
                      {detail.accordion1.map((data) => (
                        <div key={shortid.generate()}>{data}</div>
                      ))}
                    </Accordion>
                  )}

                <Accordion title="온라인 익스클루시브 혜택">
                  <div>
                    온라인 익스클루시브 혜택 탬버린즈는 고객님들께 빠른 배송 및
                    반품과 최고의 경험을 제공하기 위해 언제나 세심한 주의를
                    기울입니다. 고객님을 위한 익스클루시브 서비스를
                    경험해보세요.
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

                {/* 아코디언 세번째 */}
                <Accordion title="제품 세부 정보">
                  {Array.isArray(detail.accordion3) ? (
                    detail.accordion3.map((innerArray) => (
                      <div
                        key={shortid.generate()}
                        className={classes.acc3__box}
                      >
                        {Array.isArray(innerArray) ? (
                          innerArray.map((item, subIndex) =>
                            subIndex === 0 ? (
                              <div key={shortid.generate()}>
                                <div className={classes.acc3__title}>
                                  {item}
                                </div>
                              </div>
                            ) : (
                              <div key={shortid.generate()}>{item}</div>
                            )
                          )
                        ) : (
                          <div>{innerArray}</div>
                        )}
                      </div>
                    ))
                  ) : (
                    <div>{detail.accordion3}</div>
                  )}
                </Accordion>

                <Accordion title="배송 & 반품">
                  <div>3만원 이상 구매하실 경우 배송 비용은 무료입니다.</div>
                  <br />
                  <div style={{ color: "red" }}>
                    <strong>주문일로부터 1-2 영업일 이내 출고됩니다.</strong>
                  </div>
                  <br />
                  <div>
                    배송은 지역 택배사 사정에 따라 약간의 지연이 생길 수
                    있습니다. 배송이 시작되면 구매자에게는 이메일, 수령인에게는
                    카카오 알림톡으로 배송 정보를 전송해 드립니다.
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
      )}
      {/* 랜덤 추천상품 */}
      <div className={classes.recommend}>
        <CtgLsitContainer>
          {randomScent.map((item: MainItems) => (
            <NavLink
              key={shortid.generate()}
              to={`/shop/${item.category}/${item.itemId}`}
            >
              <ItemCard item={item} />
            </NavLink>
          ))}
        </CtgLsitContainer>
      </div>
    </>
  );
};

export default ItemDetails;
