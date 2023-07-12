import React from "react";

function nextPaginaton({ pages, currentPage, onPageChange }) {
  return (
    <li
      className={
        currentPage === pages.length ? "page-item disabled" : "page-item"
      }
    >
      <a
        className="page-link"
        href="#"
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </a>
    </li>
  );
}

export default nextPaginaton;
