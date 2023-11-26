import React, { useEffect } from "react";
import classes from "../style/signup.module.css";

import { CommonBtn } from "../components/StyledComponents/commonBtn";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase.config";

const Signup = () => {
  const navigate = useNavigate();
  //유효성 체크
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const handleEmailDomainChange = (event) => {
    const selectedDomain = event.target.value;
    if (selectedDomain === "직접 입력") {
      setValue("userEmail", "");
    } else {
      setValue("userEmail", selectedDomain);
    }
  };

  //register 함수를 select 태그의 onChange 이벤트 핸들러의 충돌 해결
  useEffect(() => {
    register("userEmail", {
      required: "이메일 도메인을 선택 / 작성 해주세요.",
    });
  }, [register]);

  // 회원가입 성공, 실패
  const onSubmit = async (data) => {
    const { emailId, userEmail, userPw, username, userHp, birth } = data;
    const email = `${emailId}@${userEmail}`;
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        userPw
      );
      console.log("회원가입 성공:", userCredential.user);

      try {
        await setDoc(doc(db, "users", userCredential.user.uid), {
          Name: username,
          PhoneNum: userHp,
          Birth: birth,
        });
        console.log("프로필 업데이트 성공");
      } catch (error) {
        console.log("프로필 업데이트 실패:", error);
      }
    } catch (error) {
      console.log("회원가입 실패:", error);
    }

    navigate("/login");
    console.log(data);
  };

  const getBorderColor = (error) => {
    return error ? "1px solid #FF6464" : "";
  };

  return (
    <section className={classes.section}>
      <div className={classes.section__inner}>
        <h1 className={classes.title}>회원가입</h1>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="userId">
                아이디(필수)
              </label>
            </div>

            <div className={classes.common__input__wrap}>
              <div className={classes.common__input__id}>
                <input
                  style={{
                    border: getBorderColor(errors.emailId),
                  }}
                  {...register("emailId", {
                    required: "이메일을 입력해주세요.",
                    pattern: {
                      value: /^[A-za-z0-9가-힣]{3,10}$/,
                      message: "영문 대소문자, 숫자만 입력 가능합니다.",
                    },
                  })}
                  type="text"
                  name="emailId"
                  id="emailId"
                  className={classes.input}
                  autoComplete="emailId"
                />
              </div>
              <span>@</span>
              <div className={classes.common__input__wrap}>
                <div className={classes.common__input__id}>
                  <input
                    style={{
                      border: getBorderColor(errors.userEmail),
                    }}
                    {...register("userEmail", {
                      required: "이메일 도메인을 선택 / 작성 해주세요.",
                    })}
                    type="text"
                    id="userEmail"
                    name="userEmail"
                    defaultValue=""
                    className={`${classes.input} ${classes.email}`}
                    autoComplete="username"
                  />
                </div>
                <div className={classes.tam__select}>
                  <div className={classes.tam__select__wrap}>
                    <select
                      {...register("email_domain", {
                        required: "이메일 도메인을 선택해주세요.",
                      })}
                      className={classes.tam__select__input}
                      id="email-select"
                      data-target="user_email"
                      defaultValue=""
                      onChange={handleEmailDomainChange}
                    >
                      <option>선택</option>
                      <option>naver.com</option>
                      <option>hanmail.net</option>
                      <option>nate.com</option>
                      <option>gmail.com</option>
                      <option>hotmail.com</option>
                      <option>hanmir.com</option>
                      <option>dreamwiz.com</option>
                      <option>lycos.co.kr</option>
                      <option>empas.com</option>
                      <option value="직접 입력">직접 입력</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            {errors?.emailId?.message ? (
              <p className={classes.p}>{errors.emailId.message}</p>
            ) : (
              errors?.userEmail?.message && (
                <p className={classes.p}>{errors.userEmail.message}</p>
              )
            )}
          </div>

          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="userPw">
                비밀번호(필수)
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
                className={classes.input}
                autoComplete="new-password"
              />
              {errors.userPw && (
                <p className={classes.p}>{errors.userPw.message}</p>
              )}
            </div>
          </div>
          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="userPwRe">
                비밀번호 확인(필수)
              </label>
            </div>
            <div className={classes.common__input}>
              <input
                style={{
                  border: getBorderColor(errors.userPwRe),
                }}
                {...register("userPwRe", {
                  required: "비밀번호 확인을 위해 다시 한번 입력해주세요.",
                  validate: (value) =>
                    value === watch("userPw") ||
                    "비밀번호가 일치하지 않습니다.",
                })}
                type="password"
                name="userPwRe"
                id="userPwRe"
                className={classes.input}
                autoComplete="new-password"
              />
              {errors.userPwRe && (
                <p className={classes.p}>{errors.userPwRe.message}</p>
              )}
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
              </li>
            </ul>
          </div>

          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="username">
                이름(필수)
              </label>
            </div>
            <div className={classes.common__input}>
              <input
                style={{
                  border: getBorderColor(errors.username),
                }}
                {...register("username", {
                  required: "이름을 입력해주세요.",
                  maxLength: {
                    value: 10,
                    message: "이름은 10자 이내로 입력해주세요.",
                  },
                  pattern: {
                    value: /^[A-Za-z가-힣]+$/,
                    message: "숫자와 특수문자는 사용할 수 없습니다.",
                  },
                })}
                type="text"
                id="username"
                name="username"
                className={classes.input}
                autoComplete="off"
              />
              {errors.username && (
                <p className={classes.p}>{errors.username.message}</p>
              )}
            </div>
          </div>
          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="userHp">
                연락처(필수)
              </label>
            </div>
            <div className={classes.common__input}>
              <input
                style={{
                  border: getBorderColor(errors.userHp),
                }}
                {...register("userHp", {
                  required: "연락처를 입력해주세요.",
                  pattern: {
                    value: /^[0-9]{3}[0-9]{4}[0-9]{4}$/,
                    message:
                      "올바른 연락처 형식을 입력해주세요. (예시: 01012341234)",
                  },
                })}
                type="tel"
                id="userHp"
                name="userHp"
                className={classes.input}
                placeholder="예 : 01012341234"
                autoComplete="email"
                inputMode="numeric"
              />
              {errors.userHp && (
                <p className={classes.p}>{errors.userHp.message}</p>
              )}
            </div>
          </div>
          <div className={classes.common__input__item}>
            <div className={classes.common__input__label}>
              <label className={classes.input__label} htmlFor="birth">
                생년월일(양력/필수)
              </label>
            </div>
            <div className={classes.common__input}>
              <input
                style={{
                  border: getBorderColor(errors.birth),
                }}
                {...register("birth", {
                  required: "생년월일을 입력해주세요.",
                  maxLength: {
                    value: 8,
                    message: "생년월일 8자리로 입력해주세요.",
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "숫자만 입력해주세요.",
                  },
                })}
                type="text"
                id="birth"
                name="birth"
                className={classes.input}
                placeholder="예 : 20200101"
                inputMode="numeric"
              />
              {errors.birth && (
                <p className={classes.p}>{errors.birth.message}</p>
              )}
            </div>
          </div>

          <div className={classes.submitBtn}>
            <CommonBtn $height="45px" type="submit">
              가입하기
            </CommonBtn>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
