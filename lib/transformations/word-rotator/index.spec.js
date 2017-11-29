'use strict';

const expect = require('chai').expect;
const WordRotator = require('./');

describe('WordRotator', () => {

  describe('#rotate', () => {

    [
      { word: [0x01, 0x02, 0x03, 0x04], expected: [0x02, 0x03, 0x04, 0x01] },
      { word: [0x3f, 0x23, 0x9d, 0x82], expected: [0x23, 0x9d, 0x82, 0x3f] }
    ].forEach((t) => {
      let testCase = `rotates ${t.word.map(b => b.toString(16))} ` +
        `to ${t.expected.map(b => b.toString(16))}`;
      it(testCase, () => {
        expect(WordRotator.rotate(t.word))
          .to.eql(t.expected);
      })
    })

  })

});
