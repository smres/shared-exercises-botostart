import editImage from "../assets/edit.svg";
import deleteImage from "../assets/delete.svg";

import styles from "./TableProducts.module.css";

function TableProducts({
  product,
  setSelectedProductId,
  setDeleteProductModal,
  setIsActiveEditBtn,
  setAddOrEditProductModal,
  products,
  setProductForm,
}) {
  const { id, price, quantity, name } = product;

  const deleteProductHandler = (id) => {
    setDeleteProductModal(true);
    setSelectedProductId(id);
  };

  const editProductHandler = (id) => {
    setIsActiveEditBtn(true);
    setAddOrEditProductModal(true);
    setSelectedProductId(id);

    const selectedProduct = products.find((product) => product.id === id);
    if (selectedProduct) {
      setProductForm(selectedProduct);
    }
  };

  return (
    <tr>
      <td>
        <button
          onClick={() => deleteProductHandler(id)}
          className={styles.deleteBtn}
        >
          <img src={deleteImage} alt="deleteProduct" />
        </button>
        <button
          className={styles.editBtn}
          onClick={() => editProductHandler(id)}
        >
          {" "}
          <img src={editImage} alt="editProduct" />
        </button>
      </td>
      <td>{id}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>{name}</td>
    </tr>
  );
}

export default TableProducts;
