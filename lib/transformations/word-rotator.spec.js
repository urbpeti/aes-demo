'use strict';

const expect = require('chai').expect;
const WordRotator = require('./word-rotator');

describe('WordRotator', () => {
  let subject = new WordRotator();

  describe('#rotate', () => {

    [
      { word: [1, 2, 3, 4], expected: [2, 3, 4, 1] },
      { word: [78, 129, 95, 200], expected: [129, 95, 200, 78] }
    ].forEach((t) => {
      it(`rotates ${t.word} to ${t.expected}`, () => {
        expect(subject.rotate(Buffer.from(t.word)))
          .to.eql(Buffer.from(t.expected));
      })
    })

  })

});
