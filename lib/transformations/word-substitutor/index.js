'use strict';

class WordSubstitutor {

  constructor(sBox) {
    this._sBox = sBox;
  }

  get(word) {
    return word.map(b => this._sBox[Math.floor(b / 0x10)][b % 0x10]);
  }

}

module.exports = WordSubstitutor;
