import styles from "./Pagination.jsx";

function Pagination({ currentPage, setCurrentPage, totalPages }) {
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className={styles.pagination} style={{ marginTop: "2rem" }}>
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        className={styles.paginationButton}
      >
        صفحه قبل
      </button>
      <span>
        صفحه {currentPage} از {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        className={styles.paginationButton}
      >
        صفحه بعد
      </button>
    </div>
  );
}

export default Pagination;
