import { useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import styles from "./ProductsTable.module.css";
import ProductsContent from "./ProductsContent";
import DeleteProductModal from "./DeleteProductModal";
import AddOrEditProductModal from "./AddOrEditProductModal";
import Pagination from "./Pagination";

function ProductsTable({ data }) {
  // console.log(data);
  const [products, setProducts] = useState(data.data || []);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [addOrEditProductModal, setAddOrEditProductModal] = useState(false);
  const [isActiveEditBtn, setIsActiveEditBtn] = useState(false);
  const [totalPages, setTotalPages] = useState(data.totalPages);
  const [currentPage, setCurrentPage] = useState(data.currentPage || 1);
  const [selectedProductInfo, setSelectedProductInfo] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    setProducts(data.data);
  }, [data.data]);

  useEffect(() => {
    setTotalPages(data.totalPages);
  }, [data.totalPages, data.data]);

  return (
    <div className={styles.container}>
      <div className={styles.topTableContent}>
        <button
          className={styles.addButton}
          onClick={() => setAddOrEditProductModal(true)}
        >
          افزودن محصول
        </button>
        <div>
          <span>مدیریت کالا</span>
          <img src="/images/img1.svg" alt="profile logo" />
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
                  <ProductsContent
                    index={index}
                    key={product.id}
                    product={product}
                    products={products}
                    setDeleteProductModal={setDeleteProductModal}
                    setSelectedProductId={setSelectedProductId}
                    setIsActiveEditBtn={setIsActiveEditBtn}
                    setAddOrEditProductModal={setAddOrEditProductModal}
                    setSelectedProductInfo={setSelectedProductInfo}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <Pagination
        key={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
        products
        // limitShow={limitShow}
        // setLimitShow={setLimitShow}/
      />

      {/* Modals__Section */}
      {/* Add--or--Edit--Product--Model */}
      {addOrEditProductModal && (
        <AddOrEditProductModal
          setAddOrEditProductModal={setAddOrEditProductModal}
          setProducts={setProducts}
          isActiveEditBtn={isActiveEditBtn}
          setIsActiveEditBtn={setIsActiveEditBtn}
          selectedProductId={selectedProductId}
          setSelectedProductInfo={setSelectedProductInfo}
          selectedProductInfo={selectedProductInfo}
        />
      )}
      {/* Delete--Product--Model */}
      {!!deleteProductModal && (
        <DeleteProductModal
          setDeleteProductModal={setDeleteProductModal}
          selectedProductId={selectedProductId}
          setProducts={setProducts}
          products={products}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          setTotalPages={setTotalPages}
        />
      )}
    </div>
  );
}

export default ProductsTable;
