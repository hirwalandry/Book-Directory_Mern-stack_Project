import http from "./httpServices";

const apiUrlEndPoints = "http://localhost:2001" + "/books";

export function addBook(book) {
  if (book._id) {
    const body = { ...book };
    delete body._id;
    return http.put(`${apiUrlEndPoints}/${book._id}`, body);
  }

  return http.post(apiUrlEndPoints, book);
}
export function getBooks() {
  return http.get(apiUrlEndPoints);
}

export function getBook(bookId) {
  return http.get(`${apiUrlEndPoints}/${bookId}`);
}

export function deleteBook(bookId) {
  return http.delete(`${apiUrlEndPoints}/${bookId}`);
}
export default {
  addBook,
  getBooks,
  getBook,
  deleteBook,
};
