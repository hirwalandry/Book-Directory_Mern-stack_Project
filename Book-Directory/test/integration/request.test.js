const Request = require("../../models/Request");
const Users = require("../../models/Users");
const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const { databaseServer, userOne, bookTwo, requestOne } = require("./userDb");

describe("requestApi", () => {
  beforeEach(databaseServer);
  describe("createRequest", () => {
    it("should request a book", async () => {
      const token = new Users().generateAuthTokens();
      const res = await request(app)
        .post("/requests")
        .set("Authorization", token)
        .send({
          title: bookTwo._id,
        });
      expect(res.status).toBe(201);
    });
  });
  describe("getRequest", () => {
    it("should get requests of  book", async () => {
      const token = new Users().generateAuthTokens();
      const res = await request(app)
        .get("/requests")
        .set("Authorization", token)
        .send({});
      expect(res.status).toBe(200);
    });
  });
  describe("viewRequest", () => {
    it("should view a request of  book", async () => {
      const token = new Users({ isAdmin: true }).generateAuthTokens();
      const res = await request(app)
        .patch(`/requests/${requestOne._id}`)
        .set("Authorization", token)
        .send({});
      expect(res.status).toBe(200);
      const requests = await Request.findById(res.body._id);
      expect(requests.viewed).toEqual(true);
    });
  });
  describe("grantRequest", () => {
    it("should grant a request of  book", async () => {
      const token = new Users({ isAdmin: true }).generateAuthTokens();
      const res = await request(app)
        .put(`/requests/${requestOne._id}`)
        .set("Authorization", token)
        .send({});
      expect(res.status).toBe(200);
      const requests = await Request.findById(res.body._id);
      expect(requests.grant).toEqual(true);
    });
  });
});
