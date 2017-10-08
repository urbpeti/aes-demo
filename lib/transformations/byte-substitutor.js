'use strict';

class ByteSubstitutor {

  constructor(sBox) {
    this._sBox = sBox;
  }

  get(byte) {
    return this._sBox[Math.floor(byte / 16)][byte % 16];
  }

}

module.exports = ByteSubstitutor;
