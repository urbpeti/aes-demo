'use strict';

const SubBytes = require('./transformations').SubBytes;
const ShiftRows = require('./transformations').ShiftRows;
const MixColumns = require('./transformations').MixColumns;
const KeyExpander = require('./key-expander');
const Util = require('./util');

class Encryptor {

  static encrypt(key, plaintext) {
    let stateBlock = Util.bufferToBlock(plaintext);
    Util.printDebug('input', stateBlock);

    const keyBlock = Util.bufferToBlock(key);
    Util.printDebug('key', stateBlock);

    const keyExpander = new KeyExpander(keyBlock);

    stateBlock = Util.xorBlock(stateBlock, keyExpander.getRoundKey(0));
    Util.printDebug('#0 after XOR', stateBlock);

    for (let i = 1; i < 10; i++) {
      stateBlock = SubBytes(stateBlock);
      Util.printDebug(`#${i} after SubBytes`, stateBlock);

      stateBlock = ShiftRows(stateBlock);
      Util.printDebug(`#${i} after ShiftRows`, stateBlock);

      stateBlock = MixColumns(stateBlock);
      Util.printDebug(`#${i} after MixColumns`, stateBlock);

      let roundKey = keyExpander.getRoundKey(i);
      Util.printDebug(`#${i} roundkey`, roundKey);

      stateBlock = Util.xorBlock(stateBlock, roundKey);
      Util.printDebug(`#${i} after XOR`, stateBlock);
    }

    stateBlock = SubBytes(stateBlock);
    Util.printDebug(`#10 after SubBytes`, stateBlock);

    stateBlock = ShiftRows(stateBlock);
    Util.printDebug(`#10 after ShiftRows`, stateBlock);

    let roundKey = keyExpander.getRoundKey(10);
    Util.printDebug(`#10 roundkey`, roundKey);

    stateBlock = Util.xorBlock(stateBlock, roundKey);
    Util.printDebug(`#10 after XOR`, stateBlock);

    return Util.blockToBuffer(stateBlock);
  }

}

module.exports = Encryptor;
