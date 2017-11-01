'use strict';

const WordRotator = require('./../transformations/word-rotator');

class KeyExpander {

  constructor(key) {
    this._key = [
      key.slice(0, 4),
      key.slice(4, 8),
      key.slice(8, 12),
      key.slice(12, 16)
    ];
  }

  getRoundKey() {
    let state = this._key.map(b => b.slice());
    return state.map(b => {
      WordRotator.rotate(b)
    });
  }

}

module.exports = KeyExpander;
