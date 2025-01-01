import { useEffect, useState } from "react";

import styles from "./PaginationAndLimit.module.css";

import Pagination from "../components/Pagination";
import api from "../configs/api";

function PaginationAndLimit({
  currentPage,
  setCurrentPage,
  totalPages,
  limitShow,
  setLimitShow,
  setProducts,
  setTotalPages,
}) {
  const limitHandler = (e) => {
    const value = e.target.value;
    setLimitShow(value);
    localStorage.setItem("selectedLimit", value);
    api.get(`/products/?page=${currentPage}&limit=${value}`).then((res) => {
      setProducts(res.data.data);
      setTotalPages(res.data.totalPages);
    });
  };

  return (
    <div className={styles.paginationAndLimit} style={{ marginTop: "2rem" }}>
      <div className={styles.pagination}>
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      <div className={styles.limit}>
        <label htmlFor="selectedLimit">
          <select
            className={styles.selectedLimit}
            onChange={limitHandler}
            value={limitShow}
            id="selectedLimit"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          :تعداد نمایش
        </label>
      </div>
    </div>
  );
}

export default PaginationAndLimit;
