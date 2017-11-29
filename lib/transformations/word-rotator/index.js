'use strict';

class WordRotator {

  static rotate(word) {
    return [
      word[1],
      word[2],
      word[3],
      word[0]
    ];
  }

}

module.exports = WordRotator;
