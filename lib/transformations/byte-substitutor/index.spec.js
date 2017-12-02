'use strict';

const expect = require('chai').expect;
const ByteSubstitutor = require('./');

describe('ByteSubstitutor', () => {
  let subject = ByteSubstitutor.create();

  describe('#getWord', () => {

    it('correctly substitues each byte in a word', () => {
      let word = [0x13, 0xf5, 0x3a, 0x9c];
      let subWord = [0x7d, 0xe6, 0x80, 0xde];
      expect(subject.getWord(word)).to.eql(subWord);
    })

  })

});
