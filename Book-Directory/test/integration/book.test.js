const Books = require("../../models/books");
const Users = require("../../models/Users");
const request = require("supertest");
const app = require("../../app");
const jwtDecode = require("jwt-decode");
const mongoose = require("mongoose");
const {
  databaseServer,
  userTwo,
  userOneId,
  bookOne,
  bookTwo,
} = require("./userDb");

const token = async () => {
  const user = new Users(userTwo);
  await user.save();
  const token = user.generateAuthTokens();
  return token;
};

describe("bookApi", () => {
  beforeEach(databaseServer);
  describe("createBook", () => {
    it("should lost the user", async () => {
      const token = new Users({ isAdmin: true }).generateAuthTokens();
      const res = await request(app)
        .post("/books")
        .set("Authorization", token)
        .send({
          title: "bakame",
          author: "Nshuti",
        });
      expect(res.status).toBe(400);
    });

    it("should create a book", async () => {
      const userTwoToken = await token();

      const res = await request(app)
        .post("/books")
        .set("Authorization", userTwoToken)
        .send({
          title: "bakame na mpyisi",
          author: "Nshuti Landry",
        });
      expect(res.status).toBe(201);
    });
  });
  describe("getAllBooks", () => {
    it("should get all books", async () => {
      const token = new Users().generateAuthTokens();
      const res = await request(app)
        .get("/books")
        .set("Authorization", token)
        .send();
      expect(res.status).toBe(200);
    });
  });
  describe("getBook", () => {
    it("should get book", async () => {
      const token = new Users().generateAuthTokens();
      const res = await request(app)
        .get(`/books/${bookOne._id}`)
        .set("Authorization", token)
        .send();
      expect(res.status).toBe(200);
    });
  });

  describe("updateBook", () => {
    it("should fail because some properties are not included", async () => {
      const userTwoToken = await token();
      const res = await request(app)
        .put(`/books/${bookOne._id}`)
        .set("Authorization", userTwoToken)
        .send({ bookName: "Ways To Be Rich" });
      expect(res.status).toBe(400);
    });

    it("should update a book", async () => {
      const userTwoToken = await token();
      const res = await request(app)
        .put(`/books/${bookOne._id}`)
        .set("Authorization", userTwoToken)
        .send({ title: "Ways To Be Rich" });
      expect(res.status).toBe(200);
      expect(res.body.title).toEqual("Ways To Be Rich");
    });
  });

  describe("approveBook", () => {
    it("should approve book", async () => {
      const userTwoToken = await token();
      const res = await request(app)
        .patch(`/books/${bookTwo._id}`)
        .set("Authorization", userTwoToken)
        .send();

      expect(res.status).toBe(200);
      const book = await Books.findById(res.body._id);
      expect(book.approved).toBeTruthy();
    });
  });
  describe("deleteBook", () => {
    it("should delete a book", async () => {
      const userTwoToken = await token();

      const res = await request(app)
        .delete(`/books/${bookOne._id}`)
        .set("Authorization", userTwoToken)
        .send();
      expect(res.status).toBe(200);
    });
    it("a book not found", async () => {
      const userTwoToken = await token();

      const bookId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .delete(`/books/${bookId}`)
        .set("Authorization", userTwoToken)
        .send();
      expect(res.status).toBe(404);
    });
  });
});
