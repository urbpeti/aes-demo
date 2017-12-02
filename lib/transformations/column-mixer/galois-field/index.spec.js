'use strict';

const expect = require('chai').expect;
const GaloisField = require('./');

describe('GaloisField', () => {

  describe('#multiply', () => {

    [
      { input: [0x07, 0x03], expected: 0x09 },
      { input: [0x05, 0x03], expected: 0x0f },
      { input: [0x02, 0x09], expected: 0x12 }
    ].forEach((t) => {
      it(`mutiplies ${t.input.map(b => b.toString(16))} together ` +
          `to get ${t.expected.toString(16)}`, () => {
        expect(GaloisField.multiply(t.input[0], t.input[1]))
          .to.eql(t.expected);
      })
    })

  })

});
