import React from "react";
import _ from "lodash";
import NextPaginaton from "./nextPaginaton";
import PreviousPage from "./previousPage";

function Pagination({ totalCount, pageSize, currentPage, onPageChange }) {
  const totalCountPage = totalCount / pageSize;
  const pages = _.range(1, totalCountPage + 1);

  return (
    <nav aria-label="...">
      <ul className="pagination">
        <PreviousPage
          pages={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
        {pages.map((page) => (
          <li
            className={currentPage === page ? "page-item active" : "page-item"}
            key={page}
          >
            <a
              className="page-link"
              href="#"
              onClick={() => onPageChange(page)}
            >
              {page}
            </a>
          </li>
        ))}
        <NextPaginaton
          pages={pages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </ul>
    </nav>
  );
}

export default Pagination;
