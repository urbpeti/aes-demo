'use strict';

class ByteSubstitutor {

  constructor(sBox) {
    this._sBox = sBox;
  }

  getBlock(block) {
    return block.map(w => this.getWord(w));
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

ByteSubstitutor.createDefault = function(sBox) {
  return new ByteSubstitutor(require('./substitution-boxes/default'));
}

ByteSubstitutor.createMultiplyBy2 = function() {
  const s = new ByteSubstitutor(require('./substitution-boxes/multiply-by-2'));
  return s.get.bind(s);
}

ByteSubstitutor.createMultiplyBy3 = function() {
  const s = new ByteSubstitutor(require('./substitution-boxes/multiply-by-3'));
  return s.get.bind(s);
}

module.exports = ByteSubstitutor;
