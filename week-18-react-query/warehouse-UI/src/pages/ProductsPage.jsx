import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./ProductsPage.module.css";

import image1 from "../assets/img1.svg";

import { notify } from "../utils/helper";
import { getCookie } from "../utils/cookie";
import { useGetAllProducts } from "../services/queries";

import AddOrEditProductForm from "../components/AddOrEditProductForm";
import DeleteProduct from "../components/DeleteProduct";
import SearchProfile from "../components/Search&Profile";
import TableProducts from "../components/TableProducts";
import PaginationAndLimit from "../components/PaginationAndLimit";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [addOrEditProductModal, setAddOrEditProductModal] = useState(false);
  const [deleteProductModal, setDeleteProductModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [productform, setProductForm] = useState({
    name: "",
    price: 0,
    quantity: 0,
  });
  const [allProducts, setAllProducts] = useState([]);
  const [getTokenFromURL, setGetTokenFromURL] = useState(
    getCookie("token") || ""
  );
  const [isActiveEditBtn, setIsActiveEditBtn] = useState("");
  const [limitShow, setLimitShow] = useState(() => {
    return localStorage.getItem("selectedLimit") || 10;
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = getCookie("token");

    if (!token) navigate("/login");
  }, [getTokenFromURL]);

  useEffect(() => {
    // const fetchProducts = async () => {
    //   try {
    //     const { data } = await api.get(
    //       `/products/?page=${currentPage}&limit=${limitShow}`
    //     );
    //     console.log(data);
    //     if (data.data && data.data.length > 0) {
    //       setProducts(data.data);
    //       setAllProducts(data.data);
    //       setTotalPages(data.totalPages);
    //     } else {
    //       notify("info", "هیچ محصولی یافت نشد");
    //       setProducts([]);
    //       setAllProducts([]);
    //       setTotalPages(1);
    //     }
    //   } catch (error) {
    //     notify("error", "خطا در دریافت اطلاعات محصولات");
    //   }
    // };
    // fetchProducts();
  }, [currentPage]);

  const { data, isPending, isError, isSuccess, error } = useGetAllProducts(
    currentPage,
    limitShow
  );
  console.log(data);

  useEffect(() => {
    if (isSuccess) {
      console.log("Products Data fetched successfully:", data);

      if (data.data && data.data.length > 0) {
        setProducts(data.data);
        setAllProducts(data.data);
        setTotalPages(data.totalPages);
      } else {
        notify("info", "هیچ محصولی یافت نشد");
        setProducts([]);
        setAllProducts([]);
        setTotalPages(1);
      }
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (isError) {
      console.error("An error occurred:", error);
      notify("error", "خطا در دریافت اطلاعات محصولات");
    }
  }, [isError, error]);

  useEffect(() => {
    localStorage.setItem("selectedLimit", limitShow);
  });

  return (
    <div className={styles.container}>
      <SearchProfile setProducts={setProducts} allProducts={allProducts} />
      <div className={styles.topTableContent}>
        <button
          className={styles.addButton}
          onClick={() => setAddOrEditProductModal(true)}
        >
          افزودن محصول
        </button>
        <div>
          <span>مدیریت کالا</span>
          <img src={image1} alt="" />
        </div>
      </div>

      {!!addOrEditProductModal && (
        <AddOrEditProductForm
          setAddOrEditProductModal={setAddOrEditProductModal}
          productform={productform}
          setProductForm={setProductForm}
          setProducts={setProducts}
          isActiveEditBtn={isActiveEditBtn}
          setIsActiveEditBtn={setIsActiveEditBtn}
          selectedProductId={selectedProductId}
        />
      )}
      {!!deleteProductModal && (
        <DeleteProduct
          setDeleteProductModal={setDeleteProductModal}
          selectedProductId={selectedProductId}
          setProducts={setProducts}
        />
      )}

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
                    setSelectedProductId={setSelectedProductId}
                    setDeleteProductModal={setDeleteProductModal}
                    setIsActiveEditBtn={setIsActiveEditBtn}
                    setAddOrEditProductModal={setAddOrEditProductModal}
                    products={products}
                    setProductForm={setProductForm}
                    index={index}
                  />
                ))}
              </tbody>
            </table>
          </div>

          <PaginationAndLimit
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            limitShow={limitShow}
            setLimitShow={setLimitShow}
            setProducts={setProducts}
            setTotalPages={setTotalPages}
          />
        </>
      )}
    </div>
  );
}

export default ProductsPage;
