import deleteProductImage from "../assets/deleteProduct.svg";

import styles from "./DeleteProduct.module.css";

import { notify } from "../utils/helper";
import { useDeleteProduct } from "../services/mutations";

function DeleteProduct({
  setDeleteProductModal,
  selectedProductId,
  setProducts,
}) {
  const { mutate } = useDeleteProduct(selectedProductId);

  const deleteProduct = () => {
    mutate(null, {
      onSuccess: (data) => {
        setProducts((prevProducts) => {
          return prevProducts.filter(
            (product) => product.id !== selectedProductId
          );
        });
        setDeleteProductModal(false);
        notify("success", "محصول با موفقیت حذف شد");
      },
      onError: (error) => {
        notify("error", "خطا در حذف محصول");
      },
    });
  };

  return (
    <div className={styles.container}>
      <form onSubmit={(e) => e.preventDefault()}>
        <img src={deleteProductImage} alt="delete" />
        <h1 style={{ marginTop: "3rem", marginBottom: "3rem" }}>
          آیا از حذف این محصول مطمئنید؟
        </h1>
        <div className={styles.acitons}>
          <button type="reset" onClick={() => setDeleteProductModal(false)}>
            انصراف
          </button>
          <button type="submit" onClick={deleteProduct}>
            حذف
          </button>
        </div>
      </form>
    </div>
  );
}

export default DeleteProduct;
