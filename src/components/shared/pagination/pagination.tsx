import css from "./pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];

    if (window.innerWidth <= 600) {
      if (currentPage > 2) pages.push(1);
      if (currentPage > 3) pages.push("...");
      pages.push(currentPage);
      if (currentPage < totalPages - 2) pages.push("...");
      if (currentPage < totalPages - 1) pages.push(totalPages);
    }
    else if (window.innerWidth <= 768) {
      const startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, currentPage + 2);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (startPage > 1) pages.unshift(1, "...");
      if (endPage < totalPages) pages.push("...", totalPages);
    }
    else {
      const startPage = Math.max(1, currentPage - 5);
      const endPage = Math.min(totalPages, currentPage + 5);
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      if (startPage > 1) pages.unshift(1, "...");
      if (endPage < totalPages) pages.push("...", totalPages);
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          onClick={() => handlePageClick(page)}
          className={`${css.page} ${page === currentPage ? css.active : ""}`}
        >
          {page}
        </button>
      ) : (
        <span key={index} className={css.page}>
          {page}
        </span>
      )
    );
  };

  return (
    <div className={css.pagination}>
      <button onClick={handlePrevious} disabled={currentPage === 1} className={css.button}>
        Previous
      </button>
      {renderPageNumbers()}
      <button onClick={handleNext} disabled={currentPage === totalPages} className={css.button}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
