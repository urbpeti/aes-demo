'use strict';

const expect = require('chai').expect;
const ByteSubstitutor = require('./byte-substitutor');

describe('ByteSubstitutor', () => {
  let subject = ByteSubstitutor.create(require('./substitution-boxes/default'));

  describe('#getWord', () => {

    it('correctly substitues each byte in a word', () => {
      let word = [0x13, 0xf5, 0x3a, 0x9c];
      let subWord = [0x7d, 0xe6, 0x80, 0xde];
      expect(subject.getWord(word)).to.eql(subWord);
    })

  })

  describe('#get', () => {

    it('correctly substitues a byte', () => {
      expect(subject.get(0xfa)).to.eql(0x2d);
    })

  })

  describe('#getBlock', () => {

    it('correctly substitues each byte in a block', () => {
      let block = [
        [0x13, 0xf5, 0x3a, 0x9c],
        [0x13, 0xf5, 0x3a, 0x9c],
        [0x13, 0xf5, 0x3a, 0x9c],
        [0x13, 0xf5, 0x3a, 0x9c]
      ]
      let subBlock = [
        [0x7d, 0xe6, 0x80, 0xde],
        [0x7d, 0xe6, 0x80, 0xde],
        [0x7d, 0xe6, 0x80, 0xde],
        [0x7d, 0xe6, 0x80, 0xde]
      ];
      expect(subject.getBlock(block)).to.eql(subBlock);
    })

  })

});
