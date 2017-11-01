'use strict';

const expect = require('chai').expect;
const RoundConstant = require('./round-constant');

describe('RoundConstant', () => {

  describe('#get', () => {

    [
      { round: 1, expected: [0x01, 0, 0, 0] },
      { round: 2, expected: [0x02, 0, 0, 0] },
      { round: 3, expected: [0x04, 0, 0, 0] },
      { round: 4, expected: [0x08, 0, 0, 0] },
      { round: 5, expected: [0x10, 0, 0, 0] },
      { round: 6, expected: [0x20, 0, 0, 0] },
      { round: 7, expected: [0x40, 0, 0, 0] },
      { round: 8, expected: [0x80, 0, 0, 0] },
      { round: 9, expected: [0x1b, 0, 0, 0] },
      { round: 10, expected: [0x36, 0, 0, 0] },
    ].forEach((t) => {
      it(`returns ${t.expected} for round #${t.round}`, () => {
        expect(RoundConstant.get(t.round))
          .to.eql(t.expected);
      })
    })

  })

});
