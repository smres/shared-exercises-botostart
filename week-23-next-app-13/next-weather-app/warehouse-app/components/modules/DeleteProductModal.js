import { useRouter } from "next/router";

import styles from "./DeleteProductModal.module.css";
import { notify } from "../../constants/toastify";
import { useDeleteProduct } from "../../services/mutations";

function DeleteProductModal({
  setDeleteProductModal,
  selectedProductId,
  setProducts,
  products,
  setCurrentPage,
  currentPage,
  setTotalPages,
  totalPages,
}) {
  const { mutate } = useDeleteProduct();

  const router = useRouter();

  const deleteProduct = () => {
    mutate(selectedProductId, {
      onSuccess: () => {
        setProducts((prev) => {
          const updatedProducts = prev.filter(
            (product) => product.id !== selectedProductId
          );
          if (updatedProducts.length === 0 && currentPage > 1) {
            setCurrentPage(currentPage - 1);
            router.push({
              pathname: "profile",
              query: { page: currentPage - 1, limit: 10 },
            });
          }
          return updatedProducts;
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
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <img src="/images/Close.png" alt="delete product" />
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

export default DeleteProductModal;
