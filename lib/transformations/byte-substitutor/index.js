'use strict';

const AES_SBOX = require('./substitution-box');

class ByteSubstitutor {

  constructor(sBox) {
    this._sBox = sBox;
  }

  getWord(word) {
    return word.map(b => this.get(b));
  }

  get(byte) {
    return this._sBox[Math.floor(byte / 0x10)][byte % 0x10];
  }

}

ByteSubstitutor.create = function() {
  return new ByteSubstitutor(AES_SBOX);
}

module.exports = ByteSubstitutor;
