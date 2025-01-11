import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import styles from "./AddOrEditProductForm.module.css";

import { useCreateOrEditProduct } from "../services/mutations";
import { notify } from "../utils/helper";

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

function AddOrEditProductForm({
  setAddOrEditProductModal,
  productform,
  setProducts,
  setProductForm,
  isActiveEditBtn,
  setIsActiveEditBtn,
  selectedProductId,
}) {
  const { name, price, quantity } = productform;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addOrEditProductsFormSchema),
    defaultValues: { name, price, quantity },
  });

  const { mutate, data } = useCreateOrEditProduct(isActiveEditBtn, selectedProductId);
  console.log(data);

  const onSubmit = (data) => {
    console.log(data);

    mutate(data, {
      onSuccess: (data) => {
        notify(
          "success",
          `محصول با موفقیت ${!isActiveEditBtn ? "اضافه" : "ویرایش"} شد`
        );
        if (!isActiveEditBtn) {
          setAddOrEditProductModal(false);
          setProducts((prev) => [...prev, data]);
          setProductForm([]);
          setIsActiveEditBtn(false);
        } else {
          setProducts((prev) =>
            prev.map((product) =>
              product.id === selectedProductId ? data : product
            )
          );
          setAddOrEditProductModal(false);
          setIsActiveEditBtn(false);
          setProductForm([]);
        }
      },
      onError: () => {
        notify(
          "error",
          `خطا در ${!isActiveEditBtn ? "اضافه" : "ویرایش"} کردن محصول`
        );
        setAddOrEditProductModal(false);
      },
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>{isActiveEditBtn ? "ویرایش اطلاعات" : "ایجاد محصول جدید"}</h1>
        <label
          style={{ textAlign: "right", width: "400px", marginTop: "1rem" }}
          htmlFor="name"
        >
          نام کالا
        </label>
        <input type="text" placeholder="نام کالا" {...register("name")} />
        <p>{errors.name?.message}</p>

        <label
          style={{ textAlign: "right", width: "400px", marginTop: "1rem" }}
          htmlFor="price"
        >
          تعداد موجودی
        </label>
        <input type="number" placeholder="تعداد" {...register("quantity")} />
        <p>{errors.quantity?.message}</p>

        <label
          style={{ textAlign: "right", width: "400px", marginTop: "1rem" }}
          htmlFor="quantity"
        >
          قیمت
        </label>
        <input type="number" placeholder="قیمت" {...register("price")} />
        <p>{errors.price?.message}</p>

        <div className={styles.acitons}>
          <button
            type="reset"
            onClick={() => (
              setAddOrEditProductModal(false), setIsActiveEditBtn(false)
            )}
          >
            انصراف
          </button>
          <button type="submit">
            {isActiveEditBtn ? "ثبت اطلاعات جدید" : "ایجاد"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddOrEditProductForm;
