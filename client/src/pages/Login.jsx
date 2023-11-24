import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import classes from "../style/login.module.css";
import { OptionBtn } from "../style/StyledComponents";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { useForm } from "react-hook-form";
import { setCartItems } from "../redux/cartSlice";

const getCartItems = async (uid) => {
  const q = query(collection(db, "carts"), where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const cartItems = [];
  querySnapshot.forEach((doc) => {
    cartItems.push(doc.data());
  });
  return cartItems;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async ({ userId, userPw }) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        userId,
        userPw
      );
      dispatch(login(userCredential.user.uid));
      console.log("로그인 성공:", userCredential.user);

      // 로그인 후에 장바구니 정보를 가져옵니다.
      const cartItems = await getCartItems(userCredential.user.uid);
      dispatch(setCartItems(cartItems));
      console.log("장바구니 항목:", cartItems);

      // cartItems를 사용하여 Redux 상태를 업데이트하거나, 로컬 상태를 설정하세요.

      navigate(`/home`); // 로그인 성공시 홈
    } catch (error) {
      console.log("로그인 실패:", error);
    }
  };

  const getBorderColor = (error) => {
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
                maxLength="50"
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
                maxLength="50"
              />
            </div>
            {errors.userPw && (
              <p className={classes.p}>{errors.userPw.message}</p>
            )}
          </div>
          <div className={classes.common__btnWrapper}>
            <OptionBtn type="submit">확인</OptionBtn>
            <OptionBtn
              as={NavLink}
              $background="var(--white)"
              $color="var(--black)"
              to={`/signup`}
              type="button"
            >
              신규 회원가입
            </OptionBtn>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
