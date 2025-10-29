import request from "supertest";
import app from "../src/app.js";

let accessToken = "";
let refreshToken = "";

describe("Pruebas de autenticación JWT", () => {
  
  test("login falla con contraseña incorrecta", async () => {
    const res = await request(app)
      .post("/jwt/login")
      .send({ email: "admin@example.com", password: "incorrecta" });
    expect(res.statusCode).toBe(401);
  });

  test("login exitoso devuelve access y refresh token", async () => {
    const res = await request(app)
      .post("/jwt/login")
      .send({ email: "admin@example.com", password: "admin123" });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
    expect(res.body.data.refreshToken).toBeDefined();

    accessToken = res.body.data.accessToken;
    refreshToken = res.body.data.refreshToken;
  });

  test("acceso a /me sin token devuelve 401", async () => {
    const res = await request(app).get("/jwt/me");
    expect(res.statusCode).toBe(401);
  });

  test("acceso a /me con token válido devuelve datos del usuario", async () => {
    const res = await request(app)
      .get("/jwt/me")
      .set("Authorization", `Bearer ${accessToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.email).toBe("admin@example.com");
  });

  test("refresh token válido devuelve nuevo access token", async () => {
    const res = await request(app)
      .post("/jwt/refresh")
      .send({ token: refreshToken });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.accessToken).toBeDefined();
  });

  test("refresh token inválido devuelve 403", async () => {
    const res = await request(app)
      .post("/jwt/refresh")
      .send({ token: "tokenInvalido" });
    expect(res.statusCode).toBe(403);
  });

});
