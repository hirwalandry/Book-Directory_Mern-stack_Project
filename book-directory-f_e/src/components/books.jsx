import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooks, deleteBook } from "./../services/bookServices";
import Paginate from "../utilityFunc/paginate";
import Pagination from "./common/pagination";
import BooksTable from "./booksTable";
import { createRequest } from "./../services/requestService";

function Books({ user }) {
  const [allBooks, setBooks] = useState([]);
  const [pageSize, setPageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    async function getAllBook() {
      const result = await getBooks();

      setBooks(result.data);
    }

    getAllBook();
  }, []);

  const handleDelete = async (book) => {
    const originalBookData = allBooks;
    const books = originalBookData.filter((b) => b._id !== book._id);
    setBooks(books);
    try {
      await deleteBook(book._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        alert("sorry. the book had been deleted");

        setBooks(books);
      }
    }
  };
  const handlePage = (page) => {
    setCurrentPage(page);
  };

  // const goToNextPage = () => {
  //   setCurrentPage((page) => page + 1);
  // };
  // const goToPreviousPage = () => {
  //   setCurrentPage((page) => page - 1);
  // };
  const books = Paginate(allBooks, currentPage, pageSize);
  return (
    <div style={{ padding: 20 }}>
      {user && (
        <button className="btn btn-primary" style={{ marginBottom: 20 }}>
          <Link to="/books/new" className=" text-white">
            NewBook
          </Link>
        </button>
      )}
      <BooksTable books={books} onDelete={handleDelete} />
      <Pagination
        totalCount={allBooks.length}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePage}
      />
    </div>
  );
}

export default Books;
