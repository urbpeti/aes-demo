'use strict';

const expect = require('chai').expect;
const WordSubstitutor = require('./');
const AES_SBOX = require('./substitution-box');

describe('WordSubstitutor', () => {
  let subject = new WordSubstitutor(AES_SBOX);

  describe('#get', () => {

    it('correctly substitues each byte in a word', () => {
      let word = [0x13, 0xf5, 0x3a, 0x9c];
      let subWord = [0x7d, 0xe6, 0x80, 0xde];
      expect(subject.get(word)).to.eql(subWord);
    })

  })

});
