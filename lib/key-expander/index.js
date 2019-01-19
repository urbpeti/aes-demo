'use strict';

const ROUND_CONSTANT = require('./round-constant');
const RotWord = require('./../transformations').RotWord;
const SubWord = require('./../transformations').SubWord;
const Util = require('./../util');

class KeyExpander {

  constructor(key) {
    this._key = key;
  }

  getRoundKey(round) {
    if (round === 0) {
      return this._key;
    }

    const previousRound = Util.transpose(this.getRoundKey(round - 1));
    const state = Util.xorWord(
      SubWord(RotWord(previousRound[3], 1)),
      ROUND_CONSTANT[round - 1]
    );

    return Util.transpose(this._calculateRoundKey(state, previousRound));
  }

  _calculateRoundKey(state, previousRound) {
    let roundKey = [];
    for (let i = 0; i < 4; i++) {
      state = Util.xorWord(state, previousRound[i]);
      roundKey[i] = state;
    }

    return roundKey;
  }

}

module.exports = KeyExpander;
