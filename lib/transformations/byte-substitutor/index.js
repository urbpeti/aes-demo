'use strict';

const AES_SBOX = require('./substitution-box');

class ByteSubstitutor {

  constructor(sBox) {
    this._sBox = sBox;
  }

  getWord(word) {
    return word.map(b => this._sBox[Math.floor(b / 0x10)][b % 0x10]);
  }

}

ByteSubstitutor.create = function() {
  return new ByteSubstitutor(AES_SBOX);
}

module.exports = ByteSubstitutor;
