'use strict';

class Util {

  static xorWord(wordA, wordB) {
    return [
      wordA[0] ^ wordB[0],
      wordA[1] ^ wordB[1],
      wordA[2] ^ wordB[2],
      wordA[3] ^ wordB[3]
    ];
  }

  static xorBlock(blockA, blockB) {
    return [
      Util.xorWord(blockA[0], blockB[0]),
      Util.xorWord(blockA[1], blockB[1]),
      Util.xorWord(blockA[2], blockB[2]),
      Util.xorWord(blockA[3], blockB[3])
    ];
  }

  static transpose(block) {
    return [
      [block[0][0], block[1][0], block[2][0], block[3][0]],
      [block[0][1], block[1][1], block[2][1], block[3][1]],
      [block[0][2], block[1][2], block[2][2], block[3][2]],
      [block[0][3], block[1][3], block[2][3], block[3][3]]
    ];
  }

  static bufferToBlock(buffer) {
    const block = [...buffer];
    return [
      [block[0], block[4], block[8], block[12]],
      [block[1], block[5], block[9], block[13]],
      [block[2], block[6], block[10], block[14]],
      [block[3], block[7], block[11], block[15]],
    ];
  }

  static blockToBuffer(block) {
    return Buffer.from(Util.transpose(block).reduce((acc, val) => acc.concat(val), []));
  }

  static printDebug(message, block) {
    if (process.env.DEBUG) {
      console.log(message);
      Util.printBlock(block);
      console.log('---');
    }
  }

  static printBlock(block) {
    console.log(
      block.map(
        word => word.map(
          byte => byte.toString(16).padStart(2, '0')
        ).join(' ')
      ).join('\n')
    );
  }

}

module.exports = Util;
