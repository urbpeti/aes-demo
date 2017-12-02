'use strict';

class GaloisField {

  static multiply(byteA, byteB) {
    let product = 0;
    for (let counter = 0; counter < 8; counter++) {
      if (GaloisField._lowBitSet(byteB)) {
        product ^= byteA;
      }

      let highBitSet = GaloisField._highBitSet(byteA);
      byteA <<= 1;

      if (highBitSet) {
        byteA ^= 0x1b;
      }

      byteB >>= 1;
    }

    return product;
  }

  static _lowBitSet(byte) {
    return (byte & 0x01) === 0x01;
  }

  static _highBitSet(byte) {
    return (byte & 0x80) === 0x80;
  }

}

module.exports = GaloisField;
