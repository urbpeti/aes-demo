'use strict';

class GaloisField {

  static multiply(byteA, byteB) {
    let factors = GaloisField._getFactors(byteA)

    return GaloisField._sumWhereBitExists(factors, byteB)
  }

  static _lowBitSet(byte) {
    return (byte & 0x01) === 0x01;
  }

  static _highBitSet(byte) {
    return (byte & 0x80) === 0x80;
  }

  static _xtimes(byte) {
    let xbyte = byte << 1;

    if(xbyte > 0xff) {
      xbyte = xbyte ^ 0x11b;
    }

    return xbyte;
  }

  static _getFactors(byte) {
    let factors = [byte];

    for(let i = 1; i < 8; i++) {
      factors.push(GaloisField._xtimes(factors[factors.length - 1]));
    }

    return factors;
  }

  static _sumWhereBitExists(factors, byte) {
    let res = 0;

    for(let i = 0; byte > 0; byte = byte >> 1, i++) {
      if(byte & 0x01 == 1)
        res ^= factors[i];
    }

    return res;
  }

}

module.exports = GaloisField;
