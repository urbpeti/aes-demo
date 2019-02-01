'use strict';

const ByteSubstitutor = require('./byte-substitutor');
const m2 = ByteSubstitutor.createMultiplyBy2();
const m3 = ByteSubstitutor.createMultiplyBy3();
const Util = require('./../util');
const { multiply } = require('./galois-field');

class ColumnMixer {

  static mixBlock(block) {
    return Util.transpose(
      Util.transpose(block).map(
        word => ColumnMixer._mix(word)
      )
    );
  }

  static invMixBlock(block) {
    return Util.transpose(
      Util.transpose(block).map(
        word => ColumnMixer._invmix(word)
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

  static _invmix(word) {
    return [
      multiply(word[0], 0x0e) ^ multiply(word[1], 0x0b) ^ multiply(word[2], 0x0d) ^ multiply(word[3], 0x09),
      multiply(word[0], 0x09) ^ multiply(word[1], 0x0e) ^ multiply(word[2], 0x0b) ^ multiply(word[3], 0x0d),
      multiply(word[0], 0x0d) ^ multiply(word[1], 0x09) ^ multiply(word[2], 0x0e) ^ multiply(word[3], 0x0b),
      multiply(word[0], 0x0b) ^ multiply(word[1], 0x0d) ^ multiply(word[2], 0x09) ^ multiply(word[3], 0x0e)
    ]
  }

}

module.exports = ColumnMixer;
