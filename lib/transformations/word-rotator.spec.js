'use strict';

const expect = require('chai').expect;
const WordRotator = require('./word-rotator');

describe('WordRotator', () => {

  describe('#rotate', () => {

    [
      {
        word: [0x01, 0x02, 0x03, 0x04],
        expected: [0x01, 0x02, 0x03, 0x04],
        count: 0
      },
      {
        word: [0x01, 0x02, 0x03, 0x04],
        expected: [0x02, 0x03, 0x04, 0x01],
        count: 1
      },
      {
        word: [0x01, 0x02, 0x03, 0x04],
        expected: [0x03, 0x04, 0x01, 0x02],
        count: 2
      },
      {
        word: [0x01, 0x02, 0x03, 0x04],
        expected: [0x04, 0x01, 0x02, 0x03],
        count: 3
      }
    ].forEach((t) => {
      let testCase = `rotates ${t.word.map(b => b.toString(16))} ` +
        `${t.count} time(s) to get ${t.expected.map(b => b.toString(16))}`;

      it(testCase, () => {
        expect(WordRotator.rotate(t.word, t.count))
          .to.eql(t.expected);
      })
    })

  })

  describe('#rotateReverse', () => {

    [
      {
        word: [0x01, 0x02, 0x03, 0x04],
        expected: [0x01, 0x02, 0x03, 0x04],
        count: 0
      },
      {
        word: [0x01, 0x02, 0x03, 0x04],
        expected: [0x04, 0x01, 0x02, 0x03],
        count: 1
      },
      {
        word: [0x01, 0x02, 0x03, 0x04],
        expected: [0x03, 0x04, 0x01, 0x02],
        count: 2
      },
      {
        word: [0x01, 0x02, 0x03, 0x04],
        expected: [0x02, 0x03, 0x04, 0x01],
        count: 3
      }
    ].forEach((t) => {
      let testCase = `rotates reverse ${t.word.map(b => b.toString(16))} ` +
        `${t.count} time(s) to get ${t.expected.map(b => b.toString(16))}`;

      it(testCase, () => {
        expect(WordRotator.rotateReverse(t.word, t.count))
          .to.eql(t.expected);
      })
    })

  })

});
