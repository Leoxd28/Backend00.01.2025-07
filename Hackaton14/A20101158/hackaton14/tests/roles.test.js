import request from "supertest";
import app from "../src/app.js";

let adminToken = "";
let userToken = "";

beforeAll(async () => {
  const adminRes = await request(app)
    .post("/jwt/login")
    .send({ email: "admin@example.com", password: "admin123" });
  adminToken = adminRes.body.data.accessToken;

  const userRes = await request(app)
    .post("/jwt/login")
    .send({ email: "user@example.com", password: "user123" });
  userToken = userRes.body.data.accessToken;
});

describe("Control de roles", () => {
  test("usuario sin rol admin no puede acceder a ruta admin", async () => {
    const res = await request(app)
      .get("/api/admin")
      .set("Authorization", `Bearer ${userToken}`);
    expect(res.statusCode).toBe(403);
  });

  test("admin accede correctamente a ruta protegida", async () => {
    const res = await request(app)
      .get("/api/admin")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
  });
});
