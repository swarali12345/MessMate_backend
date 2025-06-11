import request from "supertest";
import mongoose from "mongoose";
import app from "../server.js";
import User from "../models/User.model";

describe("Auth Routes", () => {
  const baseURL = process.env.API_VERSION + "/auth";

  const testUser = {
    name: "Test User",
    email: "testuser@example.com",
    password: "Test@1234",
    role: ["test"],
  };

  let createdUser;

  beforeAll(async () => {
    await mongoose.connect(
      process.env.TEST_MONGODB_URI || "mongodb://localhost:27017/test-db"
    );
    // ensure clean state
    await User.deleteMany({ email: testUser.email });
  });

  afterAll(async () => {
    await User.deleteMany({ email: testUser.email });
    await mongoose.disconnect();
  });

  describe("POST /register", () => {
    it("should register a user", async () => {
      const res = await request(app).post(`${baseURL}/register`).send(testUser);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("token");
      createdUser = await User.findOne({ email: testUser.email });
      expect(createdUser).not.toBeNull();
    });
  });

  describe("POST /login", () => {
    it("should login the user", async () => {
      const res = await request(app).post(`${baseURL}/login`).send({
        email: testUser.email,
        password: testUser.password,
      });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should fail login with wrong password", async () => {
      const res = await request(app).post(`${baseURL}/login`).send({
        email: testUser.email,
        password: "wrongpassword",
      });
      expect(res.statusCode).toBe(401);
    });
  });

  describe("POST /forgot-password", () => {
    it("should respond with 200 if email exists", async () => {
      const res = await request(app).post(`${baseURL}/forgot-password`).send({
        email: testUser.email,
      });
      expect(res.statusCode).toBe(200); // or 202 depending on your system
    });

    it("should respond with 404 if email does not exist", async () => {
      const res = await request(app).post(`${baseURL}/forgot-password`).send({
        email: "unknown@example.com",
      });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("UserSchema methods", () => {
    it("should generate a valid reset token and expiration", () => {
      const user = new User(testUser);
      const token = user.generate_resetPasswordToken();

      expect(typeof token).toBe("string");
      expect(token.length).toBeGreaterThan(30); // crypto token size

      expect(user.resetPasswordToken).toBe(token);
      expect(Number(user.resetPasswordExpires)).toBeGreaterThan(Date.now());
    });
  });
});
