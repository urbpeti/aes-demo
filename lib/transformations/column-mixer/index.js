'use strict';

const MULTIPLY_BY_2 = require('./../../substitution-boxes/multiply-by-2');
const MULTIPLY_BY_3 = require('./../../substitution-boxes/multiply-by-3');
const ByteSubstitutor = require('./../byte-substitutor');
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

}

module.exports = ColumnMixer;
