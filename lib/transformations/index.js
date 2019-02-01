'use strict';

const ByteSubstitutor = require('./byte-substitutor');
const WordRotator = require('./word-rotator');
const RowShifter = require('./row-shifter');
const ColumnMixer = require('./column-mixer');

const substitutor = ByteSubstitutor.createDefault();
const invsubstitutor = ByteSubstitutor.createInverse();

module.exports = {
  SubBytes: substitutor.getBlock.bind(substitutor),
  SubWord: substitutor.getWord.bind(substitutor),
  InvSubBytes: substitutor.getBlock.bind(invsubstitutor),
  RotWord: WordRotator.rotate,
  ShiftRows: RowShifter.shift,
  InvShiftRows: RowShifter.shiftReverse,
  MixColumns: ColumnMixer.mixBlock,
  InvMixColumns: ColumnMixer.invMixBlock
};
