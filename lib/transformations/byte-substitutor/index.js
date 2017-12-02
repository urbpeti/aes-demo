'use strict';

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

ByteSubstitutor.create = function(sBox) {
  return new ByteSubstitutor(sBox);
}

module.exports = ByteSubstitutor;
