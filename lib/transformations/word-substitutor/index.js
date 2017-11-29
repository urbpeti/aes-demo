'use strict';

const AES_SBOX = require('./substitution-box');

class WordSubstitutor {

  constructor(sBox) {
    this._sBox = sBox;
  }

  get(word) {
    return word.map(b => this._sBox[Math.floor(b / 0x10)][b % 0x10]);
  }

}

WordSubstitutor.create = function() {
  return new WordSubstitutor(AES_SBOX);
}

module.exports = WordSubstitutor;
