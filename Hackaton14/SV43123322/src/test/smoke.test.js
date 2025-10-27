const test = require('node:test');
const assert = require('node:assert');
const supertest = require('supertest');
const app = require('../app');

test('GET /health -> 200 ok', async () => {
  const res = await supertest(app).get('/health');
  assert.equal(res.status, 200);
  assert.equal(res.body.status, 'ok');
});

test('POST /session/login fails with wrong credentials', async () => {
  const res = await supertest(app).post('/session/login').send({ email: 'x@x.com', password: 'nope' });
  assert.equal(res.status, 401);
});

test('POST /jwt/login returns access token for seeded admin', async () => {
  const res = await supertest(app).post('/jwt/login').send({ email: 'admin@demo.com', password: 'Admin123!' });
  assert.equal(res.status, 200);
  assert.ok(res.body.access);
});