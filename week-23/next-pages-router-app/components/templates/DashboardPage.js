import { useEffect, useState } from "react";
import Image from "next/image";

// import styles from "./DashboardPage.module.css";
import { useGetAllProducts } from "../../services/queries";
import TableProducts from "../modules/TableProducts";
import { notify } from "../../utils/helper";
import SearchProfile from "../modules/Search&Profile";

function DashboardPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

  const { data, isError, isSuccess, error } = useGetAllProducts(
    currentPage,
    10
  );
  console.log(data);

  useEffect(() => {
    if (isSuccess && data?.data) {
      console.log("Products Data fetched successfully:", data);

      if (data.data.length > 0) {
        setProducts((prev) =>
          JSON.stringify(prev) === JSON.stringify(data.data) ? prev : data.data
        );
        setAllProducts(data.data);
      } else {
        notify("info", "هیچ محصولی یافت نشد");
        setProducts([]);
        setAllProducts([]);
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.error("An error occurred:", error);
      notify("error", "خطا در دریافت اطلاعات محصولات");
    }
  }, [isError, error]);

  return (
    <div className={styles.container}>
      <SearchProfile setProducts={setProducts} allProducts={allProducts} />
      <div className={styles.topTableContent}>
        <button className={styles.addButton}>افزودن محصول</button>
        <div>
          <span>مدیریت کالا</span>
          <Image
            src="/images/img1.svg"
            alt="Setting-Image"
            width={20}
            height={20}
          />
        </div>
      </div>

      {!products?.length ? (
        <h3>! محصولی وجود ندارد</h3>
      ) : (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th></th>
                  <th>شناسه کالا</th>
                  <th>قیمت</th>
                  <th>موجودی</th>
                  <th>نام کالا</th>
                  <th>شماره</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <TableProducts
                    key={product.id}
                    product={product}
                    products={products}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
