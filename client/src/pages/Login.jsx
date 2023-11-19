import React from "react";
import { NavLink } from "react-router-dom";
import classes from "../style/login.module.css";
import { OptionBtn } from "../style/StyledComponents";

function Login() {
  return (
    <section className={classes.section}>
      <div className={classes.section__inner}>
        <h4 className={classes.section__login}>로그인</h4>
        <div className={classes.common__input__item}>
          <div className={classes.common__input__label}>
            <label className={classes.input__label} htmlFor="user_id">
              아이디
            </label>
          </div>
          <div className={classes.common__input}>
            <form>
              <input
                type="text"
                name="user_id"
                id="user_id"
                className={classes.input}
                maxLength="50"
              />
            </form>
          </div>
        </div>
        <div className={classes.common__input__item}>
          <div className={classes.common__input__label}>
            <label className={classes.input__label} htmlFor="user_pw">
              비밀번호
            </label>
          </div>
          <div className={classes.common__input}>
            <form>
              <input
                type="password"
                name="user_pw"
                id="user_pw"
                autoComplete="off"
                className={classes.input}
                aria-required="true"
                required
                maxLength="50"
              />
            </form>
          </div>
        </div>
        <div className={classes.common__btnWrapper}>
          <OptionBtn type="submit" id="btn-track-order">
            확인
          </OptionBtn>
          <OptionBtn $background="var(--white)" $color="var(--black)">
            <NavLink to={`/signup`} type="button">
              신규 회원가입
            </NavLink>
          </OptionBtn>
        </div>
      </div>
    </section>
  );
}

export default Login;
