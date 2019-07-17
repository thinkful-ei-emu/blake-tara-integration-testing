const expect = require('chai').expect;
const indexFunctions = require('../index');

describe('sort function' , ()=>{

  it('should have error when not array', ()=>{
    
    const array = 404;
    const fn = ()=> indexFunctions.sort(array);
    expect(fn).to.throw();

  });







});