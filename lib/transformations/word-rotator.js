'use strict';

class WordRotator {

  static rotate(word, count) {
    if (count === 0) {
      return word;
    }

    const rotated = [
      word[1],
      word[2],
      word[3],
      word[0]
    ];

    return WordRotator.rotate(rotated, count - 1);
  }

}

module.exports = WordRotator;
