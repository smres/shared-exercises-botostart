import * as yup from "yup";

const loginFormSchema = yup.object().shape({
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

const registrationFormSchema = yup
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

const addOrEditProductsFormSchema = yup.object().shape({
  name: yup.string().required("وارد کردن نام محصول الزامی است"),
  quantity: yup
    .number()
    .min(3, "تعداد محصول باید حداقل 3 باشد")
    .typeError("تعداد رو به عدد وارد کنید")
    .required("وارد کردن تعداد الزامی است"),
  price: yup
    .number()
    .typeError("قیمت را به عدد وارد کنید")
    .min(1000, "قیمت کمتر از 1000 تومن است")
    .required("وارد کردن قیمت الزامی است"),
});

export { loginFormSchema, registrationFormSchema, addOrEditProductsFormSchema };
