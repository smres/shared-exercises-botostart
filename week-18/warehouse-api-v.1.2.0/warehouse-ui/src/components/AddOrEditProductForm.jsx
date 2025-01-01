import styles from "./AddOrEditProductForm.module.css";

import { notify } from "../utils/helper";
import api from "../configs/api";

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

  const changeProductHandler = (event) => {
    setProductForm((form) => ({
      ...form,
      [event.target.name]: event.target.value,
    }));
  };

  const addProduct = async (e) => {
    e.preventDefault();

    if (!name || !price || !quantity)
      return notify("warning", "!لطفا فیلدها رو به درستی پر کنید");

    try {
      if (!isActiveEditBtn) {
        const response = await api.post("/products", productform);
        notify("success", "محصول با موفقیت اضافه شد");
        setAddOrEditProductModal(false);
        setProducts((prev) => [...prev, response.data]);
        setProductForm([]);
        setIsActiveEditBtn(false);
      } else {
        const response = await api.put(`/products/${selectedProductId}`, {
          name,
          price,
          quantity,
        });
        notify("success", "محصول با موفقیت ویرایش شد");
        setProducts((prev) =>
          prev.map((product) =>
            product.id === selectedProductId ? response.data : product
          )
        );
        setAddOrEditProductModal(false);
        setProductForm({ name: "", price: "", quantity: "", id: null });
        setIsActiveEditBtn(false);
      }
    } catch (error) {
      notify("error", "خطا در اضافه کردن محصول");
      setAddOrEditProductModal(false);
    }
  };

  return (
    <div className={styles.container}>
      <form>
        <h1>{isActiveEditBtn ? "ویرایش اطلاعات" : "ایجاد محصول جدید"}</h1>
        <label
          style={{ textAlign: "right", width: "400px", marginTop: "1rem" }}
          htmlFor="name"
        >
          نام کالا
        </label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="نام کالا"
          value={name || ""}
          onChange={changeProductHandler}
        />
        <label
          style={{ textAlign: "right", width: "400px", marginTop: "1rem" }}
          htmlFor="price"
        >
          تعداد موجودی
        </label>
        <input
          id="quantity"
          type="number"
          name="quantity"
          placeholder="تعداد"
          value={quantity || ""}
          onChange={changeProductHandler}
        />
        <label
          style={{ textAlign: "right", width: "400px", marginTop: "1rem" }}
          htmlFor="quantity"
        >
          قیمت
        </label>
        <input
          id="price"
          type="number"
          name="price"
          placeholder="قیمت"
          value={price || ""}
          onChange={changeProductHandler}
        />
        <div className={styles.acitons}>
          <button
            type="reset"
            onClick={() => (
              setAddOrEditProductModal(false), setIsActiveEditBtn(false)
            )}
          >
            انصراف
          </button>
          <button type="submit" onClick={addProduct}>
            {isActiveEditBtn ? "ثبت اطلاعات جدید" : "ایجاد"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddOrEditProductForm;
