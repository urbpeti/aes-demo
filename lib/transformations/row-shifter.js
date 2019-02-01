'use strict';

const WordRotator = require('./word-rotator');

class RowShifter {

  static shift(block) {
    return block.map(
      (word, i) => WordRotator.rotate(word, i)
    );
  }

  static shiftReverse(block) {
    return block.map(
      (word, i) => WordRotator.rotateReverse(word, i)
    );
  }

}

module.exports = RowShifter;
