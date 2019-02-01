
'use strict';

const InvSubBytes = require('./transformations').InvSubBytes;
const InvShiftRows = require('./transformations').InvShiftRows;
const InvMixColumns = require('./transformations').InvMixColumns;
const KeyExpander = require('./key-expander');
const Util = require('./util');

class Decryptor {

  static decrypt(key, ciphertext) {
    let stateBlock = Util.bufferToBlock(ciphertext);
    Util.printDebug('input', stateBlock);

    const keyBlock = Util.bufferToBlock(key);
    Util.printDebug('key', stateBlock);

    const keyExpander = new KeyExpander(keyBlock);

    let roundKey = keyExpander.getRoundKey(10);
    Util.printDebug(`#10 roundkey`, roundKey);

    stateBlock = Util.xorBlock(stateBlock, roundKey);
    Util.printDebug(`#1 after XOR`, stateBlock);

    for (let i = 9; i > 0; i--) {
      stateBlock = InvShiftRows(stateBlock);
      Util.printDebug(`#${10 - i} after InvShiftRows`, stateBlock);

      stateBlock = InvSubBytes(stateBlock);
      Util.printDebug(`#${10 - i} after InvSubBytes`, stateBlock);

      roundKey = keyExpander.getRoundKey(i);
      Util.printDebug(`#${i} roundkey`, roundKey);

      stateBlock = Util.xorBlock(stateBlock, roundKey);
      Util.printDebug(`#${10 - i} after XOR`, stateBlock);

      stateBlock = InvMixColumns(stateBlock);
      Util.printDebug(`#${10 - i} after InvMixColumns`, stateBlock);
    }

    stateBlock = InvShiftRows(stateBlock);
    Util.printDebug(`#10 after InvShiftRows`, stateBlock);

    stateBlock = InvSubBytes(stateBlock);
    Util.printDebug(`#10 after InvSubBytes`, stateBlock);

    roundKey = keyExpander.getRoundKey(0);
    Util.printDebug(`#0 roundkey`, roundKey);

    stateBlock = Util.xorBlock(stateBlock, roundKey);
    Util.printDebug(`#10 after XOR`, stateBlock);

    return Util.blockToBuffer(stateBlock);
  }

}

module.exports = Decryptor;
