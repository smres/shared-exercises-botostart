import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import styles from "./AddOrEditProductModal.module.css";
import { notify } from "../../constants/toastify";
import { addOrEditProductsFormSchema } from "../../schema/formValidations";
import { useCreateOrEditProduct } from "../../services/mutations";

function AddOrEditProductModal({
  setAddOrEditProductModal,
  selectedProductInfo,
  setProducts,
  setSelectedProductInfo,
  isActiveEditBtn,
  setIsActiveEditBtn,
  selectedProductId,
}) {
  const { name, price, quantity } = selectedProductInfo;

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addOrEditProductsFormSchema),
    defaultValues: { name, price, quantity },
  });

  const { mutate, data } = useCreateOrEditProduct(
    isActiveEditBtn,
    selectedProductId
  );

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: (data) => {
        if (!isActiveEditBtn) {
          setAddOrEditProductModal(false);
          setProducts((prev) => [...prev, data]);
          setSelectedProductInfo([]);
          setIsActiveEditBtn(false);
        } else {
          setProducts((prev) =>
            prev.map((product) =>
              product.id === selectedProductId ? data : product
            )
          );
          setAddOrEditProductModal(false);
          setIsActiveEditBtn(false);
          setSelectedProductInfo([]);
        }
        notify(
          "success",
          `محصول با موفقیت ${!isActiveEditBtn ? "اضافه" : "ویرایش"} شد`
        );
        // router.reload();
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
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h1>{isActiveEditBtn ? "ویرایش اطلاعات" : "ایجاد محصول جدید"}</h1>
        <label
          style={{ textAlign: "right", width: "400px", marginTop: "1rem" }}
          htmlFor="name"
        >
          نام کالا
        </label>
        <input type="text" placeholder="نام کالا" {...register("name")} />
        <p className={styles.error}>{errors.name?.message}</p>

        <label
          style={{ textAlign: "right", width: "400px", marginTop: "1rem" }}
          htmlFor="price"
        >
          تعداد موجودی
        </label>
        <input type="number" placeholder="تعداد" {...register("quantity")} />
        <p className={styles.error}>{errors.quantity?.message}</p>

        <label
          style={{ textAlign: "right", width: "400px", marginTop: "1rem" }}
          htmlFor="quantity"
        >
          قیمت
        </label>
        <input type="number" placeholder="قیمت" {...register("price")} />
        <p className={styles.error}>{errors.price?.message}</p>

        <div className={styles.acitons}>
          <button
            type="reset"
            onClick={() => (
              setAddOrEditProductModal(false),
              setIsActiveEditBtn(false),
              setSelectedProductInfo([])
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

export default AddOrEditProductModal;
