'use strict';

const ByteSubstitutor = require('./byte-substitutor');
const AES_SBOX = require('./substitution-boxes/default');
const WordRotator = require('./word-rotator');
const RowShifter = require('./row-shifter');
const ColumnMixer = require('./column-mixer');

const substitutor = ByteSubstitutor.create(AES_SBOX);

module.exports = {
  SubBytes: substitutor.getBlock.bind(substitutor),
  SubWord: substitutor.getWord.bind(substitutor),
  RotWord: WordRotator.rotate,
  ShiftRows: RowShifter.shift,
  MixColumns: ColumnMixer.mixBlock
};
