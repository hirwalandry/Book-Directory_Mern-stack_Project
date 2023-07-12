import React from "react";

function PreviousPage({ pages, currentPage, onPageChange }) {
  return (
    <li className={currentPage === 1 ? "page-item disabled" : "page-item"}>
      <a
        className="page-link"
        href="#"
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </a>
    </li>
  );
}

export default PreviousPage;
