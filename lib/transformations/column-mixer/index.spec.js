'use strict';

const expect = require('chai').expect;
const ColumnMixer = require('./');

xdescribe('ColumnMixer', () => {

  describe('#mix', () => {

    [
      {
        name: 'case 1',
        state: [
          [0xd4, 0xe0, 0xb8, 0x1e],
          [0xbf, 0xb4, 0x41, 0x27],
          [0x5d, 0x52, 0x11, 0x98],
          [0x30, 0xae, 0xf1, 0xe5]
        ],
        expected: [
          [0x04, 0xe0, 0x48, 0x28],
          [0x66, 0xcb, 0xf8, 0x06],
          [0x81, 0x19, 0xd3, 0x26],
          [0xe5, 0x9a, 0x7a, 0x4c]
        ]
      }
    ].forEach((t) => {
      it(`mixes ${t.name} correctly`, () => {
        expect(ColumnMixer.mix(t.state)).to.eql(t.expected);
      })
    })

  })

});
