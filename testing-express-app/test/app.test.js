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

describe('GET /sum', () => {
  it('8/4 should be 2', () => {
    return request(app)
      .get('/sum')
      .query({a: 8, b:4})
      .expect(200, '8 divided by 4 is 2');
  });
  it('should return 400 if a is missing', () => {
    return request(app)
      .get('/sum')
      .query({b:4})
      .expect(400, 'Value for a is needed');
  });
});

describe('GET /generate endpoint', () => {
  it('should generate an array of 5', () => {
    return request(app)
      .get('/generate') // invoke the endpoint
      .query({n:5}) // send the query string ?n=5
      .expect(200)  //assert that you get a 200  OK status
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array'); // make sure you get an array
        expect(res.body).to.have.lengthOf.at.least(1); // array must not be empty
        expect(res.body).to.have.members([1,2,3,4,5]); // this assertion fails   
      });
  });
});

describe('GET /midpoint endpoint', () => {
  it('should find midpoint between NY and LA', () => {
    const query = {
      lat1: 40.6976701, //NY
      lon1: -74.2598674, //NY
      lat2: 34.0207305, //LA
      lon2: -118.6919221 //LA
    };

    // somewhere near Aurora, Kansas
    const expected = {
      lat: 39.50597300917347,
      lon: -97.51789156106972       
    };

    return request(app)
      .get('/midpoint')
      .query(query)
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.have.all.keys('lat', 'lon');
        expect(res.body).to.eql(expected);
      });
  });
});

describe('/frequency endpoint', () => {
  it('should return 400 when no string provided', () =>{
    return request(app)
      .get('/frequency')
      .query('')
      .expect(400, 'Invalid request');
  });

  it('should return the correct data when given a good string', () => {
    return request(app)
      .get('/frequency')
      .query({s: 'This is an example string'})
      .expect(200)
      .expect('Content-type', /json/)
      .then(res => {
        expect(res.body.unique).to.equal(14);
        expect(res.body.average).to.equal(1.7857142857142858);
        expect(res.body.highest).to.equal(' ');
      });
  });
});

