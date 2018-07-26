const flat = require('../index');
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  zero: String,
  one: {
    number: Number,
    true: Boolean,
    two: {
      string: { type: String, maxlength: 10 },
      three: {
        val: Number
      }
    }
  },
  anotherOne: {
    number: { type: Number, max: 2, min: 0 }
  }
});

const obj = flat({
  zero: 'abc',
  one: {
    number: 2.8,
    true: true,
    two: {
      string: 'two',
      three: {
        val: 50
      }
    }
  },
  anotherOne: 1
}, schema);

describe('nested', () => {

  it('preserves first level', () => {
    expect(obj.zero).toBe('abc');
  });

  it('transforms one level', () => {
    expect(obj['one.number']).toBe(2.8);
    expect(obj['one.true']).toBe(true);
  });

  it('transforms two level', () => {
    expect(obj['one.two.string']).toBe('two');
  });

  it('transforms third level', () => {
    expect(obj['one.two.three.val']).toBe(50);
  });
});
