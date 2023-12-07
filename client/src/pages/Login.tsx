import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "../style/login.module.css";
import { CommonBtn } from "../components/StyledComponents/commonBtn";

import { useDispatch } from "react-redux";
import { login, logout } from "../redux/authSlice";
import { setCartItems } from "../redux/cartSlice";

import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase.config";

import { useForm } from "react-hook-form";

import { CartItem } from "model/cartItem";

//유저 카트에 담긴 상품 조회
const getCartItems = async (uid: any): Promise<CartItem[]> => {
  const q = query(collection(db, "carts"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const cartItems: CartItem[] = [];
  querySnapshot.forEach((doc) => {
    cartItems.push(doc.data() as CartItem);
  });
  return cartItems;
};

interface FormInputs {
  userId: string;
  userPw: string;
}

const Login = () => {
  // 리액트 훅 폼
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: "onChange" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  interface LoginInfo {
    userId: string;
    userPw: string;
  }

  //로그인
  const onSubmit = async ({ userId, userPw }: LoginInfo): Promise<void> => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userId,
        userPw
      );
      dispatch(login(userCredential.user.uid));

      const cartItems = await getCartItems(userCredential.user.uid);
      dispatch(setCartItems(cartItems));

      // 로그인에 성공하면 로컬 스토리지 삭제
      localStorage.clear();

      // 유저가 섹션을 닫지 않을 경우의 로직
      setTimeout(() => {
        dispatch(logout()); // 로그아웃 액션 디스패치
        navigate(`/login`);
      }, 60 * 60 * 1000); // 1시간 후

      navigate(`/home`); // 로그인 성공시 홈
    } catch (error) {
      throw new Error("로그인 실패");
    }
  };
  // 입력양식이 다를 경우 경고 역할
  const getBorderColor = (error: any) => {
    return error ? "1px solid #FF6464" : "";
  };

  return (
    <section className={classes.section}>
      <div className={classes.section__inner}>
        <h4 className={classes.section__login}>로그인</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="userId">
                아이디
              </label>
            </div>
            <div className={classes.common__input}>
              <input
                style={{
                  border: getBorderColor(errors.userId),
                }}
                {...register("userId", {
                  required: "아이디를 입력해주세요.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "올바른 이메일 형식을 입력해주세요.",
                  },
                })}
                type="text"
                name="userId"
                id="userId"
                className={classes.input}
                maxLength={50}
              />
            </div>
            {errors.userId && (
              <p className={classes.p}>{errors.userId.message}</p>
            )}
          </div>
          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="userPw">
                비밀번호
              </label>
            </div>
            <div className={classes.common__input}>
              <input
                style={{
                  border: getBorderColor(errors.userPw),
                }}
                {...register("userPw", {
                  required: "비밀번호를 입력해주세요.",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+/<>,]).+$/,
                    message:
                      "비밀번호는 최소 1개의 대문자, 특수문자, 숫자를 포함해야 합니다.",
                  },
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8자 이상으로 입력해주세요.",
                  },
                  maxLength: {
                    value: 20,
                    message: "비밀번호는 20자 이내로 입력해주세요.",
                  },
                })}
                type="password"
                name="userPw"
                id="userPw"
                autoComplete="off"
                className={classes.input}
                aria-required="true"
                maxLength={50}
              />
            </div>
            {errors.userPw && (
              <p className={classes.p}>{errors.userPw.message}</p>
            )}
          </div>
          <div className={classes.common__btnWrapper}>
            <CommonBtn type="submit">확인</CommonBtn>
            <CommonBtn
              as={NavLink}
              $background="var(--white)"
              $color="var(--black)"
              to={`/signup`}
              type="button"
            >
              신규 회원가입
            </CommonBtn>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
