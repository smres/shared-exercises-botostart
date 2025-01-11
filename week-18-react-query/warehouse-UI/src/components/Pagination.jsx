import styles from "./Pagination.module.css";

function Pagination({ currentPage, setCurrentPage, totalPages }) {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className={styles.pagination}>
      <div>
        {pageNumbers.map((page) => (
          <span
            onClick={() => setCurrentPage(page)}
            className={
              currentPage === page ? styles.selectedPage : styles.unSelectedPage
            }
            key={page}
            style={{ marginRight: "1rem" }}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Pagination;
