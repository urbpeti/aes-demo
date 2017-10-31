'use strict';

const ROUND_CONSTANTS = [1, 2, 4, 8, 16, 32, 64, 128, 27, 54];

class RoundConstant {

  static get(round) {
    return Buffer.from([
      ROUND_CONSTANTS[round - 1], 0, 0, 0
    ]);
  }

}

module.exports = RoundConstant;
