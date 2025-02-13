import Link from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./RegistrationPage.module.css";
import { registrationFormSchema } from "../../schema/formValidations";
import { useRegister } from "../../services/mutations";
import { notify } from "../../constants/toastify";

function RegistrationPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationFormSchema),
  });

  const { data, mutate, isPending } = useRegister();

  const onSubmit = (data) => {
    console.log("اطلاعات فرم ثبت نام:", data);
    mutate(data, {
      onSuccess: (data) => {
        console.log(data);
        notify("success", "ثبت نام با موفقیت انجام شد");
        router.push("/login");
      },
      onError: (error) => {
        console.log(error);
        if (error.response?.status === 400) {
          notify("error", "نام کاربری تکراری است");
        } else {
          notify("error", "خطایی رخ داده است");
        }
      },
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div>
        <img src="/images/Union.png" alt="UnionLogoPng" />
        <h1>فرم ثبت نام</h1>
      </div>
      <input
        className={`${styles.userNameField} ${styles.input}`}
        placeholder="نام کاربری"
        {...register("username")}
      />
      <p className={styles.p}>{errors.username?.message}</p>
      <input
        className={styles.input}
        type="password"
        placeholder="رمز عبور"
        {...register("password")}
      />
      <p className={styles.p}>{errors.password?.message}</p>
      <input
        className={styles.input}
        type="password"
        placeholder="تکرار رمز عبور"
        {...register("confirmPassword")}
      />
      <p className={styles.p}>{errors.confirmPassword?.message}</p>
      <button className={styles.button} type="submit">
        ثبت نام
      </button>
      <div className={styles.link}>
        <Link href="/login">حساب کاربری دارید؟</Link>
      </div>
    </form>
  );
}

export default RegistrationPage;
