'use strict';

class WordRotator {

  static rotate(word, count) {
    let rotated = [
      word[1],
      word[2],
      word[3],
      word[0]
    ];

    if (!count || count === 1) {
      return rotated;
    }

    return WordRotator.rotate(rotated, count - 1);
  }

}

module.exports = WordRotator;
