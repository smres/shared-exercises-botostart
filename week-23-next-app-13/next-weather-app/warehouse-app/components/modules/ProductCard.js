import Link from "next/link";
import styles from "./ProductCard.module.css";

function ProductCard(props) {
  const {
    download_url,
    store: { name, price },
  } = props;
  console.log({ download_url });

  return (
    <div className={styles.cardContainer}>
      <img src={download_url} />
      <div className={styles.bodyText}>
        <h2>{name}</h2>
        <p>قیمت: {price} ريال</p>
      </div>
      <Link href="/card">جزییات محصول</Link>
    </div>
  );
}

export default ProductCard;
