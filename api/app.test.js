const request = require('supertest');
const app = require('./app');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'mySecretKey';

describe('tests', () => {
  const adminToken = jwt.sign({ id: 'u2', role: 'admin' }, SECRET_KEY);
  const userToken = jwt.sign({ id: 'u1', role: 'user' }, SECRET_KEY);

  test('1. Successful delete by admin', async () => {
    const res = await request(app)
      .delete('/posts/123')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted by u2/);
  });

  test('2. Forbidden delete by normal user', async () => {
    const res = await request(app)
      .delete('/posts/123')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toBe(403);
    expect(res.body.message).toBe('Forbidden');
  });

  test('3. missing/invalid token', async () => {
    const res = await request(app)
      .delete('/posts/123');
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/Missing or invalid token/);
  });
});
