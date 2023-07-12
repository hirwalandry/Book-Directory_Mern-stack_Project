const Users = require("../../models/Users");
const jwtDecode = require("jwt-decode");
const request = require("supertest");
const app = require("../../app");
const { databaseServer, userTwoId, userOneId } = require("./userDb");

describe("usersApi", () => {
  beforeEach(databaseServer);
  describe("createUser", () => {
    it("should create user", async () => {
      const res = await request(app).post("/users").send({
        firstName: "gigi",
        lastName: "landry",
        email: "lanmmmgly12376975",
        password: "kanaka123",
      });
      expect(res.status).toBe(201);
      expect(res.body.token).not.toBe("");
    });
  });
  describe("loginUser", () => {
    it("should login user", async () => {
      const res = await request(app).post("/users/login").send({
        email: "hirwalandry77@gmail.com",
        password: "nshuti1234",
      });
      expect(res.status).toBe(200);
    });
  });
  describe("getUsers", () => {
    it("should get users", async () => {
      const token = new Users({ isAdmin: true }).generateAuthTokens();
      const res = await request(app).get("/users").set("Authorization", token);
      expect(res.status).toBe(200);
    });
    it("should not get users because of authorization case", async () => {
      const token = new Users().generateAuthTokens();
      const res = await request(app).get("/users").set("Authorization", token);
      expect(res.status).toBe(403);
    });
  });
  describe("getUser", () => {
    it("should get users", async () => {
      const token = new Users().generateAuthTokens();
      const user = jwtDecode(token);

      const res = await request(app)
        .get(`/users/${user._id}`)
        .set("Authorization", token)
        .send();
      expect(res.status).toBe(200);
    });
    it("should not get users because of authentication case", async () => {
      const res = await request(app)
        .get("/users/" + userTwoId)
        .send();
      expect(res.status).toBe(401);
    });
  });
  describe("updateUser", () => {
    it("should update user", async () => {
      const token = new Users().generateAuthTokens();

      const res = await request(app)
        .put(`/users/${userOneId}`)
        .set("Authorization", token)
        .send({
          firstName: "iradukunda",
        });
      expect(res.status).toBe(200);
    });
  });
  describe("deleteUser", () => {
    it("should delete user", async () => {
      const token = new Users({ isAdmin: true }).generateAuthTokens();

      const res = await request(app)
        .delete(`/users/${userOneId}`)
        .set("Authorization", token)
        .send();
      expect(res.status).toBe(200);
    });
  });
});
