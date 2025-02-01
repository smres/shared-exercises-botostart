import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./LoginPage.module.css";
import Logo from "../icons/Logo";
import { useLogin } from "../../services/mutations";
import { notify } from "../../utils/helper";
import { setCookie } from "../../utils/cookie";

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("وارد کردن نام کاربری الزامی است")
    .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
    .max(20, "نام کاربری نباید بیشتر از ۲۰ کاراکتر باشد"),
  password: yup
    .string()
    .required("وارد کردن رمز عبور الزامی است")
    .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
});

function LoginPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { data, mutate, isPending } = useLogin();

  const onSubmit = (data) => {
    console.log("اطلاعات فرم:", data);
    mutate(data, {
      onSuccess: (data) => {
        console.log("داده‌های دریافتی:", data);
        if (data?.token) {
          setCookie("token", data?.token);
          notify("success", "!با موفقیت وارد پنل کاربری شدید");
          router.replace("/products");
        }
      },
      onError: (error) => {
        console.log("خطا:", error);
        if (error.response?.status === 400) {
          notify("error", "نام کاربری یا رمز عبور اشتباه است");
        } else {
          notify("error", "خطا در ورود، لطفا دوباره تلاش کنید");
        }
      },
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Logo />
        <h1>فرم ورود</h1>
      </div>
      <input
        type="text"
        className={styles.userNameField}
        placeholder="نام کاربری"
        {...register("username")}
      />
      <p className={styles.p}>{errors.username?.message}</p>

      <input type="password" placeholder="رمز عبور" {...register("password")} />
      <p className={styles.p}>{errors.password?.message}</p>

      <button className={styles.button} type="submit">
        ورود
      </button>
      <div className={styles.link}>
        <Link className={styles.linkA} href="/registration">
          !ایجاد حساب کاربری
        </Link>
      </div>
    </form>
  );
}

export default LoginPage;
