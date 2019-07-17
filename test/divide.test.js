const divide = require('../index');
const expect = require('chai').expect;

describe('Divide function', () => {
  it('should divide positive integers correctly', () => {
    const a = 8,
          b = 4,
          expectedAnswer = 2;
    const actualAnswer = divide(a,b);
    expect(actualAnswer).to.equal(expectedAnswer);
  });

  it('should throw an error when divided by zero', () => {
    const a = 8,
          b = 0;
    const fn = () => {divide(a,b)};
    expect(fn).to.throw();
  });
});