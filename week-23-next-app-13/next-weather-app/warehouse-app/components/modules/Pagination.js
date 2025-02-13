import { useRouter } from "next/router";

import styles from "./Pagination.module.css";
import { useEffect } from "react";

function Pagination({
  currentPage,
  setCurrentPage,
  totalPages,
  setTotalPages,
  products,
}) {
  const router = useRouter();
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  console.log({ totalPages, currentPage });

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
      router.push({
        pathname: "profile",
        query: { page: Math.max(1, totalPages), limit: 10 },
      });
    }
  }, [totalPages]);

  // useEffect(() => {
  //   setTotalPages(Math.ceil(products.length / 10)); // فرض بر اینکه هر صفحه ۱۰ محصول داره
  // }, [products]);

  useEffect(() => {
    if (!+router.query.page) {
      return setCurrentPage(1);
    }
    setCurrentPage(+router.query.page);
  }, []);

  const pageClickHandler = (page) => {
    setCurrentPage(page);
    router.push({
      pathname: "profile",
      query: page > 1 ? { page, limit: 10 } : {},
    });
  };

  return (
    <div className={styles.pagination}>
      {pageNumbers.map((page) => (
        <span
          onClick={() => pageClickHandler(page)}
          className={
            currentPage === page ? styles.selectedPage : styles.unSelectedPage
          }
          key={page}
        >
          {page}
        </span>
      ))}
    </div>
  );
}

export default Pagination;
