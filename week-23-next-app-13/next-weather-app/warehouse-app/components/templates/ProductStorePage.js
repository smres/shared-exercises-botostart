import Image from "next/image";
import styles from "./ProductStorePage.module.css";
import ProductCard from "../modules/ProductCard";

const arrayList = [
  { id: 0, name: "Product1", price: 0 },
  { id: 1, name: "Product2", price: 10 },
  { id: 2, name: "Product3", price: 20 },
  { id: 3, name: "Product4", price: 30 },
  { id: 4, name: "Product5", price: 40 },
  { id: 5, name: "Product6", price: 50 },
  { id: 6, name: "Product7", price: 60 },
  { id: 7, name: "Product8", price: 70 },
];

function ProductStorePage({ images }) {
  console.log(images);
  const imagesData = images;

  return (
    <div className={styles.container}>
      {arrayList.map((store) => (
        <ProductCard key={store.name} {...imagesData[store.id]} store={store} />
      ))}
    </div>
  );
}

export default ProductStorePage;
