'use strict';

const SubBytes = require('./transformations').SubBytes;
const ShiftRows = require('./transformations').ShiftRows;
const MixColumns = require('./transformations').MixColumns;
const KeyExpander = require('./key-expander');
const Util = require('./util');

class Encryptor {

  static encrypt(key, plaintext) {
    let state = Util.bufferToBlock(plaintext);
    Util.printDebug('input', state);

    const keyBlock = Util.bufferToBlock(key);
    Util.printDebug('key', state);

    const keyExpander = new KeyExpander(keyBlock);
    state = Util.xorBlock(state, keyExpander.getRoundKey(0));
    Util.printDebug('#0 after XOR', state);

    for (let i = 1; i < 10; i++) {
      state = SubBytes(state);
      Util.printDebug(`#${i} after SubBytes`, state);

      state = ShiftRows(state);
      Util.printDebug(`#${i} after ShiftRows`, state);

      state = MixColumns(state);
      Util.printDebug(`#${i} after MixColumns`, state);

      let roundKey = keyExpander.getRoundKey(i);
      Util.printDebug(`#${i} roundkey`, roundKey);

      state = Util.xorBlock(state, roundKey);
      Util.printDebug(`#${i} after XOR`, state);
    }

    state = SubBytes(state);
    Util.printDebug(`#10 after SubBytes`, state);

    state = ShiftRows(state);
    Util.printDebug(`#10 after ShiftRows`, state);

    let roundKey = keyExpander.getRoundKey(10);
    Util.printDebug(`#10 roundkey`, roundKey);

    state = Util.xorBlock(state, roundKey);
    Util.printDebug(`#10 after XOR`, state);

    return Util.blockToBuffer(state);
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
