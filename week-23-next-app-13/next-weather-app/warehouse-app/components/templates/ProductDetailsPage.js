import styles from "./ProductDetailsPage.module.css";

function ProductDetailsPage(props) {
  const { id, name, price, quantity } = props;
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>جزییات محصول</h1>
      <div className={styles.productInfo}>
        <p className={styles.productInfo}>
          <span>شناسه محصول: </span>
          {id}
        </p>
        <p className={styles.productInfo}>
          <span>نام محصول: </span>
          {name}
        </p>
        <p className={styles.productInfo}>
          <span>قیمت محصول: </span>
          {price}
        </p>
        <p className={styles.productInfo}>
          <span>تعداد محصول: </span>
          {quantity}
        </p>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
