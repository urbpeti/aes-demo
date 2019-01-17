'use strict';

const expect = require('chai').expect;
const ColumnMixer = require('./column-mixer');

describe('ColumnMixer', () => {

  describe('#mix', () => {

    [
      {
        column: [0xd4, 0xbf, 0x5d, 0x30],
        expected: [0x04, 0x66, 0x81, 0xe5]
      },
      {
        column: [0xb8, 0x41, 0x11, 0xf1],
        expected: [0x48, 0xf8, 0xd3, 0x7a]
      }
    ].forEach((t) => {
      it(`mixes ${t.column.map(b => b.toString(16))} to ${t.expected.map(b => b.toString(16))}`, () => {
        expect(ColumnMixer.mix(t.column)).to.eql(t.expected);
      })
    })

  })

  describe('#mixBlock', () => {

    it('mixes a block correctly', () => {
      let block = [
        [0xd4, 0xd4, 0xd4, 0xd4],
        [0xbf, 0xbf, 0xbf, 0xbf],
        [0x5d, 0x5d, 0x5d, 0x5d],
        [0x30, 0x30, 0x30, 0x30],
      ];
      let mixedBlock = [
        [0x04, 0x04, 0x04, 0x04],
        [0x66, 0x66, 0x66, 0x66],
        [0x81, 0x81, 0x81, 0x81],
        [0xe5, 0xe5, 0xe5, 0xe5],
      ];
      expect(ColumnMixer.mixBlock(block)).to.eql(mixedBlock);
    })

  })

});
