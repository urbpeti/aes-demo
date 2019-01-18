'use strict';

const MULTIPLY_BY_2 = require('./substitution-boxes/multiply-by-2');
const MULTIPLY_BY_3 = require('./substitution-boxes/multiply-by-3');
const ByteSubstitutor = require('./byte-substitutor');
const multiplyBy2 = ByteSubstitutor.create(MULTIPLY_BY_2);
const multiplyBy3 = ByteSubstitutor.create(MULTIPLY_BY_3);

class ColumnMixer {

  static mix(column) {
    return [
      multiplyBy2.get(column[0]) ^ multiplyBy3.get(column[1]) ^ column[2] ^ column[3],
      column[0] ^ multiplyBy2.get(column[1]) ^ multiplyBy3.get(column[2]) ^ column[3],
      column[0] ^ column[1] ^ multiplyBy2.get(column[2]) ^ multiplyBy3.get(column[3]),
      multiplyBy3.get(column[0]) ^ column[1] ^ column[2] ^ multiplyBy2.get(column[3])
    ];
  }

  static mixBlock(block) {
    let mixedBlock = [[], [], [], []];
    let b = ColumnMixer._transpose(block);
    for (let i = 0; i < 4; i++) {
      mixedBlock[i] = ColumnMixer.mix(b[i]);
    }

    return ColumnMixer._transpose(mixedBlock);
  }

  static _transpose(block) {
    return [
      [block[0][0], block[1][0], block[2][0], block[3][0]],
      [block[0][1], block[1][1], block[2][1], block[3][1]],
      [block[0][2], block[1][2], block[2][2], block[3][2]],
      [block[0][3], block[1][3], block[2][3], block[3][3]]
    ];
  }

}

module.exports = ColumnMixer;
