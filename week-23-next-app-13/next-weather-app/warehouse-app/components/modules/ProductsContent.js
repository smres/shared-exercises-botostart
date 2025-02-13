import { useRouter } from "next/router";
import styles from "./ProductsContent.module.css";
import RemoveProduct from "../icons/RemoveProduct";
import EditProduct from "../icons/EditProduct";

function ProductsContent({
  index,
  product,
  products,
  setSelectedProductInfo,
  setDeleteProductModal,
  setSelectedProductId,
  setIsActiveEditBtn,
  setAddOrEditProductModal,
}) {
  const { id, price, quantity, name } = product;
  const router = useRouter();

  const goToProductDetailsPage = () => {
    router.push(`/profile/${id}`);
  };

  const deleteProductHandler = (event, id) => {
    event.stopPropagation();
    setDeleteProductModal(true);
    setSelectedProductId(id);
  };

  const editProductHandler = (event, id) => {
    event.stopPropagation();
    setIsActiveEditBtn(true);
    setAddOrEditProductModal(true);
    setSelectedProductId(id);

    const selectedProduct = products.find((product) => product.id === id);
    if (selectedProduct) {
      setSelectedProductInfo(selectedProduct);
    }
  };

  return (
    <tr className={styles.container} onClick={goToProductDetailsPage}>
      <td>
        <button
          onClick={(event) => deleteProductHandler(event, id)}
          className={styles.deleteBtn}
        >
          <RemoveProduct />
        </button>
        <button
          className={styles.editBtn}
          onClick={(event) => editProductHandler(event, id)}
        >
          <EditProduct />
        </button>
      </td>
      <td>{id}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>{name}</td>
      <td>{index + 1}</td>
    </tr>
  );
}

export default ProductsContent;
