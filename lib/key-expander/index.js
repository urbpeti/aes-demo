'use strict';

const ROUND_CONSTANT = require('./round-constant');
const RotWord = require('./../transformations').RotWord;
const SubWord = require('./../transformations').SubWord;

class KeyExpander {

  constructor(key) {
    this._key = key;
  }

  getRoundKey(round) {
    if (round === 0) {
      return this._key;
    }

    let previousRound = this._transpose(this.getRoundKey(round - 1).map(b => b.slice()));
    let state = this._xor(
      SubWord(RotWord(previousRound[3])),
      ROUND_CONSTANT[round - 1]
    );

    return this._transpose(this._calculateRoundKey(state, previousRound));
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

  _transpose(block) {
    return [
      [block[0][0], block[1][0], block[2][0], block[3][0]],
      [block[0][1], block[1][1], block[2][1], block[3][1]],
      [block[0][2], block[1][2], block[2][2], block[3][2]],
      [block[0][3], block[1][3], block[2][3], block[3][3]]
    ];
  }

}

module.exports = KeyExpander;
