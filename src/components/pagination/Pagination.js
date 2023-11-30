import React, { useEffect, useState } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  totalProducts,
  setCurrentPage,
  productsPerPage,
}) => {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const [pageNumbersLimit, setPageNumbersLimit] = useState(2);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(pageNumbersLimit);

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (number) => {
    setCurrentPage(number);
  };

  const pervPage = () => {
    setCurrentPage(currentPage - 1);
    if (currentPage <= minPageNumberLimit+1) {
      // setMinPageNumberLimit(minPageNumberLimit - 1);
      // setMaxPageNumberLimit(maxPageNumberLimit - 1);
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumbersLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumbersLimit);
    }
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage >= maxPageNumberLimit) {
      // setMaxPageNumberLimit(maxPageNumberLimit + 1);
      // setMinPageNumberLimit(minPageNumberLimit + 1);
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumbersLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumbersLimit);
    }
  };

  useEffect(() => {
    if(totalProducts > 0){
      setCurrentPage(1);
      setMinPageNumberLimit(0);
      setMaxPageNumberLimit(pageNumbersLimit)
    }else{
      setCurrentPage(0)
    }   
  }, [totalProducts]);

  return (
    <ul className={styles.pagination}>
      <li
        className={currentPage <= 1 ? `${styles.hidden}` : null}
        onClick={pervPage}
      >
        PREV
      </li>

      {pageNumbers.map((number) => {
        if (number <= maxPageNumberLimit && number > minPageNumberLimit) {
          return (
            <li
            key={number}
              className={currentPage === number ? `${styles.active}` : null}
              onClick={() => paginate(number)}
            >
              {number}
            </li>
          );
        }
      })}

      <li
        className={currentPage >= totalPages ? `${styles.hidden}` : null}
        onClick={nextPage}
      >
        NEXT
      </li>

      <p>
        <span className={styles.page}>
          <b>Page {currentPage}</b>
        </span>{" "}
        of <b>{totalPages}</b>
      </p>
    </ul>
  );
};

export default Pagination;
