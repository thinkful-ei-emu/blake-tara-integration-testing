const app = require('../app.js');
const expect = require('chai').expect;
const request = require('supertest');


describe ('testing app functionality', ()=>{

  it('if no query params then return valid array still', ()=>{

    return request(app)
      .get('/apps')
      .query({})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res =>{
        expect(res.body).to.be.an('array');
        expect(res.body).length.to.have.lengthOf.at.least(1);
      });
      

  });
  it('if invalid genre', () =>{

    return request(app)
      .get('/apps')
      .query({genres: 'potato'})
      .expect(404 , 'invalid genre or sort');
  });

  it('if invalid sort', () =>{

    return request(app)
      .get('/apps')
      .query({sort: 'potato'})
      .expect(404 , 'invalid genre or sort');
  });

  it('valid sort', ()=>{
    return request(app)
      .get('/apps')
      .query({sort: 'App'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).length.to.have.lengthOf.at.least(1);
        let i = 0; 
        let sorted = true;
        while(sorted && i < res.body.length - 1) {
          sorted = (sorted && res.body[i].App > res.body[i + 1].App);
          i++; } 
        expect(sorted).to.be.true;
      });


  });

});

