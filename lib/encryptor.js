'use strict';

const SubBytes = require('./transformations').SubBytes;
const ShiftRows = require('./transformations').ShiftRows;
const MixColumns = require('./transformations').MixColumns;
const KeyExpander = require('./key-expander');

class Encryptor {

  static encrypt(key, plaintext) {
    let state = Encryptor._getBlock(plaintext);
    const keyExpander = new KeyExpander(Encryptor._getBlock(key));

    // console.log(`input => \n`, Encryptor._printBlock(state));
    // console.log(`round key => \n`, Encryptor._printBlock(keyExpander.getRoundKey(0)));
    state = Encryptor._xorBlock(state, keyExpander.getRoundKey(0));

    for (let i = 1; i < 10; i++) {
      state = SubBytes(state);
      // console.log(`SubBytes round #${i} => \n`, Encryptor._printBlock(state));
      state = ShiftRows(state);
      // console.log(`ShiftRows round #${i} => \n`, Encryptor._printBlock(state));
      state = MixColumns(state);
      // console.log(`MixColumns round #${i} => \n`, Encryptor._printBlock(state));
      state = Encryptor._xorBlock(state, keyExpander.getRoundKey(i));
      // console.log(`round #${i} key => \n`, Encryptor._printBlock(keyExpander.getRoundKey(i)));
      // console.log(`XOR round #${i} => \n`, Encryptor._printBlock(state));
    }

    state = SubBytes(state);
    // console.log(`SubBytes round #10 => \n`, Encryptor._printBlock(state));
    state = ShiftRows(state);
    // console.log(`ShiftRows round #10 => \n`, Encryptor._printBlock(state));
    state = Encryptor._xorBlock(state, keyExpander.getRoundKey(10));
    // console.log(`round #10 key => \n`, Encryptor._printBlock(keyExpander.getRoundKey(10)));
    // console.log(`XOR round #10 => \n`, Encryptor._printBlock(state));

    return Encryptor._toBuffer(state);
  }

  static _getBlock(buffer) {
    const block = [...buffer];
    return [
      [block[0], block[4], block[8], block[12]],
      [block[1], block[5], block[9], block[13]],
      [block[2], block[6], block[10], block[14]],
      [block[3], block[7], block[11], block[15]],
    ];
  }

  static _toBuffer(block) {
    return Buffer.from([
      block[0][0], block[1][0], block[2][0], block[3][0],
      block[0][1], block[1][1], block[2][1], block[3][1],
      block[0][2], block[1][2], block[2][2], block[3][2],
      block[0][3], block[1][3], block[2][3], block[3][3]
    ]);
  }

  static _xorBlock(blockA, blockB) {
    const xoredBlock = [[],[],[],[]];
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        xoredBlock[i][j] = blockA[i][j] ^ blockB[i][j]
      }
    }

    return xoredBlock;
  }

  static _printBlock(block) {
    return block.map((w) => {
      return w.map(b => {
        return b.toString(16);
      });
    });
  }

}

module.exports = Encryptor;
