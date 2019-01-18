'use strict';

const ByteSubstitutor = require('./byte-substitutor');
const m2 = ByteSubstitutor.createMultiplyBy2();
const m3 = ByteSubstitutor.createMultiplyBy3();
const Util = require('./../util');

class ColumnMixer {

  static mixBlock(block) {
    return Util.transpose(
      Util.transpose(block).map(
        word => ColumnMixer._mix(word)
      )
    );
  }

  static _mix(word) {
    return [
      m2(word[0]) ^ m3(word[1]) ^ word[2]     ^ word[3],
      word[0]     ^ m2(word[1]) ^ m3(word[2]) ^ word[3],
      word[0]     ^ word[1]     ^ m2(word[2]) ^ m3(word[3]),
      m3(word[0]) ^ word[1]     ^ word[2]     ^ m2(word[3])
    ];
  }

}

module.exports = ColumnMixer;
