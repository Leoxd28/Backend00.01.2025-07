import { test, after } from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import server from '../server.js';

after(() => server.close());

test('session login fails with wrong password', async () => {
  // 1️⃣ obtener CSRF token
  const csrfRes = await request(server).get('/session/login');
  const csrfToken = csrfRes.headers['x-csrf-token'];
  const cookie = csrfRes.headers['set-cookie'];

  // 2️⃣ mandar post con header correcto + cookie
  const res = await request(server)
    .post('/session/login')
    .set('x-csrf-token', csrfToken)
    .set('Cookie', cookie)
    .send({ email: 'a@a.com', password: 'x' });

  assert.equal(res.statusCode, 401);
});

test('jwt login returns access + sets refresh cookie', async () => {
  const res = await request(server)
    .post('/jwt/login')
    .send({ email: 'admin@acme.test', password: 'Admin#123' });

  assert.equal(res.statusCode, 200);
  assert.ok(res.body.access);
  assert.ok(res.headers['set-cookie'].some(c => c.startsWith('refresh=')));
});
