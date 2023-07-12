import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Table from "./common/table";
import { createRequest } from "../services/requestService";

function BooksTable({ books, onDelete }) {
  const createRequests = async (request) => {
    const promise = await createRequest(request);
    if (promise.status === 201) {
      toast.info(promise.data.Message);
      window.location = "/";
    }
  };

  const columns = [
    { path: "title", Title: "Title" },
    { path: "author", Title: "Author" },
    { path: "user.name", Title: "User" },
    {
      key: "request",
      content: (book) => (
        <button
          type="button"
          className="btn btn-info btn-sm"
          onClick={() =>
            createRequests({ title: book._id, user: book.user._id })
          }
        >
          request
        </button>
      ),
    },
    {
      key: "action",
      content: (book) => (
        <React.Fragment>
          <button type="button" className="btn btn-primary btn-sm m-2">
            <Link to={`/books/${book._id}`} style={{ color: "white" }}>
              update
            </Link>
          </button>
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(book)}
          >
            delete
          </button>
        </React.Fragment>
      ),
    },
  ];

  return <Table columns={columns} data={books} />;
}

export default BooksTable;
