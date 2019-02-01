'use strict';

const expect = require('chai').expect;
const GaloisField = require('./galois-field.js');

describe('GaloisField', () => {

  describe('#multiply', () => {

    [
      { input: [0x01, 0x01], expected: 0x01 },
      { input: [0x01, 0x02], expected: 0x02 },
      { input: [0x07, 0x03], expected: 0x09 },
      { input: [0x02, 0x09], expected: 0x12 },
      { input: [0xff, 0x03], expected: 0x1a }
    ].forEach((t) => {
      it(`mutiplies ${t.input.map(b => b.toString(16))} together ` +
          `to get ${t.expected.toString(16)}`, () => {
        expect(GaloisField.multiply(t.input[0], t.input[1]))
          .to.eql(t.expected);
      })
    })

  })

});
