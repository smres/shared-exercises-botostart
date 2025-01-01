import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// import styles from RegistrationPage.module.css file
import styles from "./LoginPage.module.css";

// import logo site
import logo from "../assets/logo.svg";

import api from "../configs/api";
import { setCookie } from "../utils/cookie";
import { notify } from "../utils/helper";
import { useLocalStorage } from "../hooks/useLocalStorage";

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
  const navigate = useNavigate();

  const [profileInfo, setProfileInfo] = useLocalStorage("profileInfo", {});

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    try {
      console.log(data);
      setProfileInfo(data);
      api.post("auth/login", data).then((res) => {
        if (res.data?.token) {
          console.log(res);
          setCookie("token", res.data?.token);
          notify("success", "!با موفقیت وارد پنل کاربری شدید");
          navigate("/", { replace: true });
        } else {
          notify("error", "نام کاربری یا رمز عبور اشتباه است");
        }
      });
    } catch (error) {
      notify("error", "خطا در ورود، لطفا دوباره تلاش کنید");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <img src={logo} alt="logo-site" />
        <h1>فرم ورود</h1>
      </div>
      <input
        type="text"
        className={styles.userNameField}
        placeholder="نام کاربری"
        {...register("username")}
      />
      <p>{errors.username?.message}</p>

      <input type="password" placeholder="رمز عبور" {...register("password")} />
      <p>{errors.password?.message}</p>

      <button className={styles.button} type="submit">
        ورود
      </button>
      <div className={styles.link}>
        <Link to="/registration">!ایجاد حساب کاربری</Link>
      </div>
    </form>
  );
}

export default LoginPage;
