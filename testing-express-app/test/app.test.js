const app = require('../app');
const expect = require('chai').expect;
const request = require('supertest');

describe('testing app.js code', ()=>{
  it('shoulld return valid response', ()=>{

    return request(app)
      .get('/')
      .expect(200, 'Hello Express!');
  });



});

