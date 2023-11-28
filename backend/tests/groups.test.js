const supertest = require('supertest');
const app = require('../index');
const db = require('../models/index');
const Group = db.groups;

const api = supertest(app);

//test token
let TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJqYXZpZXJUZXN0IiwicGFzc3dvcmQiOiIkMmEkMTAkRzJPcS5GTS5ILzguNUhHaFdVRzluLktJREliYzA5cnBCSmpBRHBVb0d2Y3VtelNCZ2MzYWUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDEwOTg3MzMsImV4cCI6MTcwMTE4NTEzM30.i1BUd7fMJHqrLKU9criFIA2_6hUyKXnl8famJOrDfs0";

beforeAll(async () => {
  await db.sequelize.sync();
})

describe('GROUP API', () => {

  test('should return status 200 for Groups get all with valid token', async () => {
    await api.get('/api/groups').set('Authorization', `Bearer ${TOKEN}`).expect(200);
  });

  test('should return status 401 (Unauthorized) for Groups get all without valid token', async () => {
    await api.get('/api/groups').set('Authorization', 'Bearer testToken').expect(401);
  });

  test('should create propperly a group and saves it correctly in the database', async () => {
    const response = await api.post('/api/groups').set('Authorization', `Bearer ${TOKEN}`).send({ name: 'testGroup' }).expect(200);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');

    const newGroupId = response.body.id;

    const createdGroup = await Group.findByPk(newGroupId);

    expect(createdGroup).toBeTruthy();
    expect(createdGroup.name).toEqual('testGroup');
  });

  test('should fail on the creation of the groups when there is no name (err 400: Bad request)', async () => {
    await api.post('/api/groups').set('Authorization', `Bearer ${TOKEN}`).send({ name: '' }).expect(400);
    await api.post('/api/groups').set('Authorization', `Bearer ${TOKEN}`).send({ name: null }).expect(400);
  });

});