import styles from "./TableProducts.module.css";
import Edit from "../icons/Edit";
import Delete from "../icons/Delete";

function TableProducts({ product, index }) {
  const { id, price, quantity, name } = product;

  return (
    <tr>
      <td className={styles.td}>
        <button className={`${styles.deleteBtn} ${styles.button}`}>
          <Edit className={styles.img} />
        </button>
        <button className={`${styles.editBtn} ${styles.button}`}>
          {" "}
          <Delete className={styles.img} />
        </button>
      </td>
      <td className={styles.td}>{id}</td>
      <td className={styles.td}>{price}</td>
      <td className={styles.td}>{quantity}</td>
      <td className={styles.td}>{name}</td>
      <td className={styles.td}>{index + 1}</td>
    </tr>
  );
}

export default TableProducts;
