import React from "react";
import classes from "../style/signup.module.css";

import { OptionBtn } from "../style/StyledComponents";

const Signup = () => {
  return (
    <section className={classes.section}>
      <div className={classes.section__inner}>
        <h1 className={classes.title}>회원가입</h1>
        <form className={classes.form}>
          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="user_id">
                아이디(필수)
              </label>
            </div>

            <div className={classes.common__input__wrap}>
              <div className={classes.common__input__id}>
                <input
                  type="text"
                  name="user_id"
                  id="user_id"
                  required
                  className={classes.input}
                  autoComplete="off"
                />
              </div>
              <span>@</span>
              <div className={classes.common__input__wrap}>
                <div className={classes.common__input__id}>
                  <input
                    type="text"
                    id="user_email"
                    name="user_email"
                    readOnly
                    aria-readonly="true"
                    className={classes.input}
                  />
                </div>
                <div className={classes.tam__select}>
                  <div className={classes.tam__select__wrap}>
                    <select
                      className={classes.tam__select__input}
                      id="email-select"
                      data-target="user_email"
                    >
                      <option value="" selected disabled>
                        선택
                      </option>
                      <option value="naver.com">naver.com</option>
                      <option value="hanmail.net">hanmail.net</option>
                      <option value="nate.com">nate.com</option>
                      <option value="gmail.com">gmail.com</option>
                      <option value="hotmail.com">hotmail.com</option>
                      <option value="hanmir.com">hanmir.com</option>
                      <option value="dreamwiz.com">dreamwiz.com</option>
                      <option value="lycos.co.kr">lycos.co.kr</option>
                      <option value="empas.com">empas.com</option>
                      <option value="direct">직접 입력</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="user_password">
                비밀번호(필수)
              </label>
            </div>
            <div className={classes.common__input}>
              <input
                type="password"
                name="user_password"
                id="user_password"
                required
                className={classes.input}
                size="20"
                maxLength="20"
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label
                className={classes.input__label}
                htmlFor="user_password_re"
              >
                비밀번호 확인(필수)
              </label>
            </div>
            <div className={classes.common__input}>
              <input
                type="password"
                name="user_password_re"
                id="user_password_re"
                required
                className={classes.input}
                size="20"
                maxLength="20"
                autoComplete="new-password"
              />
            </div>
          </div>
          <div className={classes.common__input__notice__item}>
            <ul>
              <li className={classes.member__notice__item}>
                · 영문 대소문자는 구분이 되며, 최소 1개의 대문자, 특수문자,
                숫자가 포함 된 비밀번호를 사용하셔야 됩니다.
              </li>
              <li className={classes.member__notice__item}>
                · 사용 가능한 특수문자: ! @ # $ % ^ &amp; * ( )__+ / &lt; &gt; ,
                .
              </li>
            </ul>
          </div>
          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="user_sex">
                *성별(선택)
              </label>
            </div>
            <div className={classes.tam__select}>
              <div className={classes.tam__select__wrap}>
                <span className={classes.tam__select__ico}></span>
                <select
                  className={classes.tam__select__input}
                  name="user_sex"
                  id="gender-select"
                >
                  <option value="" selected disabled>
                    성별을 선택해주세요.
                  </option>
                  <option value="남">남자</option>
                  <option value="여">여자</option>
                </select>
              </div>
            </div>
          </div>
          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="user_name">
                이름(필수)
              </label>
            </div>
            <div className={classes.common__input}>
              <input
                type="text"
                id="user_name"
                name="user_name"
                required
                className={classes.input}
                size="10"
                autoComplete="off"
              />
            </div>
          </div>
          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="user_hp">
                연락처(필수)
              </label>
            </div>
            <div className={classes.common__input}>
              <input
                type="tel"
                id="user_hp"
                name="user_hp"
                required
                className={classes.input}
                placeholder="예 : 01012341234"
                autoComplete="email"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength="13"
              />
              <OptionBtn
                id="register_hp_send-btn"
                className={classes.input__btn__ath}
                type="button"
                $background="initial"
                $color="var(--black)"
                $height="33px"
              >
                인증하기
              </OptionBtn>
            </div>
          </div>
          <div className={classes.common__input__item}>
            <input
              type="hidden"
              value="0"
              id="init_check_input"
              name="init_check_input"
            />
            <div className={classes.authentication__number}>
              <div className={classes.common__input__label}>
                <label className={classes.input__label} htmlFor="">
                  인증번호 입력
                </label>
              </div>
              <div className={classes.common__input}>
                <input
                  type="text"
                  id="user_number"
                  name="user_number"
                  className={classes.input}
                  size="11"
                />
                <button
                  style={{ width: "60px" }}
                  className={classes.input__btn__resend}
                  id="resend_btn"
                  type="button"
                >
                  재전송
                </button>
                <button
                  style={{ width: "60px" }}
                  className={classes.input__btn}
                  id="init_check_btn"
                  type="button"
                >
                  인증하기
                </button>
              </div>
            </div>
          </div>
          <div
            className={classes.common__input__item}
            id="hp_check_div"
            style={{ display: "none" }}
          >
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="">
                연락처
              </label>
            </div>
            <div className={classes.common__input}>
              <input
                type="text"
                id="hp_check_input"
                readOnly
                className={classes.input}
                size="11"
              />
            </div>
          </div>
          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="reg_mb_birth">
                생년월일(양력/필수)
              </label>
            </div>
            <div className={classes.common__input}>
              <input
                type="text"
                id="reg_mb_birth"
                required
                className={classes.input}
                size="8"
                placeholder="예 : 2020-01-31"
                pattern="[0-9]*"
                inputMode="numeric"
              />
              <input type="hidden" id="reg_mb_birth-hidden" name="mb_birth" />
            </div>
          </div>

          <div className={classes.submitBtn}>
            <OptionBtn $height="45px" type="submit">
              가입하기
            </OptionBtn>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
