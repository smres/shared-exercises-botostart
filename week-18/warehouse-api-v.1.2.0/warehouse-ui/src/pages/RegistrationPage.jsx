// import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./RegistrationPage.module.css";

import logo from "../assets/logo.svg";

import api from "../configs/api";
import { notify } from "../utils/helper";

const registrationSchema = yup
  .object({
    username: yup
      .string()
      .required("وارد کردن نام کاربری الزامی است")
      .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
      .max(20, "نام کاربری نباید بیشتر از ۲۰ کاراکتر باشد"),
    password: yup
      .string()
      .required("وارد کردن رمز عبور الزامی است")
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .matches(/[A-Z]/, "رمز عبور باید حداقل یک حرف بزرگ داشته باشد")
      .matches(/[a-z]/, "رمز عبور باید حداقل یک حرف کوچک داشته باشد")
      .matches(/[0-9]/, "رمز عبور باید حداقل یک عدد داشته باشد")
      .matches(/[@$!%*?&#]/, "رمز عبور باید حداقل یک کاراکتر خاص داشته باشد"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "رمز عبور و تأیید رمز عبور یکسان نیستند"
      )
      .required("تأیید رمز عبور الزامی است"),
  })
  .required();

function RegistrationPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    api
      .post("auth/register", data)
      .then((res) => {
        console.log(res);
        notify("success", "ثبت نام با موفقیت انجام شد");
        navigate("/login", { replace: true });
      })
      .catch((error) => {
        if (error.response?.status === 400) {
          notify("error", "نام کاربری تکراری است");
        } else {
          notify("error", "خطایی رخ داده است");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <img src={logo} alt="logo-site" />
        <h1>فرم ثبت نام</h1>
      </div>
      <input
        className={styles.userNameField}
        placeholder="نام کاربری"
        {...register("username")}
      />
      <p>{errors.username?.message}</p>
      <input type="password" placeholder="رمز عبور" {...register("password")} />
      <p>{errors.password?.message}</p>
      <input
        type="password"
        placeholder="تکرار رمز عبور"
        {...register("confirmPassword")}
      />
      <p>{errors.confirmPassword?.message}</p>
      <button className={styles.button} type="submit">
        ثبت نام
      </button>
      <div className={styles.link}>
        <Link to="/login">حساب کاربری دارید؟</Link>
      </div>
    </form>
  );
}

export default RegistrationPage;
