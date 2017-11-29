'use strict';

const WordRotator = require('./../transformations/word-rotator');
const WordSubstitutor = require('./../transformations/word-substitutor').create();
const ROUND_CONSTANT = require('./round-constant');

class KeyExpander {

  constructor(key) {
    this._key = [
      key.slice(0, 4),
      key.slice(4, 8),
      key.slice(8, 12),
      key.slice(12, 16)
    ];
  }

  getRoundKey(round) {
    if (round === 0) {
      return this._key;
    }

    let previousRound = this.getRoundKey(round - 1).map(b => b.slice());
    let state = this._xor(
      WordSubstitutor.get(
        WordRotator.rotate(previousRound[3])
      ),
      ROUND_CONSTANT[round - 1]
    );

    return this._calculateRoundKey(state, previousRound);
  }

  _calculateRoundKey(state, previousRound) {
    let roundKey = [];
    for (let i = 0; i < 4; i++) {
      state = this._xor(state, previousRound[i]);
      roundKey[i] = state;
    }

    return roundKey;
  }

  _xor(wordA, wordB) {
    return [
      wordA[0] ^ wordB[0],
      wordA[1] ^ wordB[1],
      wordA[2] ^ wordB[2],
      wordA[3] ^ wordB[3]
    ];
  }

}

module.exports = KeyExpander;
