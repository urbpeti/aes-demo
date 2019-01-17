'use strict';

const WordRotator = require('./word-rotator');

class RowShifter {

  static shift(block) {
    const shiftedBlock = [block[0]];
    for (let i = 1; i < block.length; i++) {
      let row = block[i];
      shiftedBlock[i] = WordRotator.rotate(row, i);
    }

    return shiftedBlock;
  }

}

module.exports = RowShifter;
