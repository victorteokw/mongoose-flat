const flat = require('../index');
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  firstLevelString: String,
  firstLevelNumber: Number,
  firstLevelTrue: Boolean,
  firstLevelFalse: Boolean,
  firstLevelDate: Date,
  firstLevelMixed: mongoose.Schema.Types.Mixed,
  nested: {
    string: String,
    number: Number,
    true: Boolean,
    false: Boolean,
    date: Date,
    mixed: mongoose.Schema.Types.Mixed
  }
});
const date = new Date();
const obj = flat({
  firstLevelString: 'string value',
  firstLevelNumber: 4,
  firstLevelTrue: true,
  firstLevelFalse: false,
  firstLevelDate: date,
  firstLevelMixed: { a: 1, b: 2 },
  nested: {
    string: 'nested string value',
    number: 2.8,
    true: true,
    false: false,
    date,
    mixed: { c: 3, d: 4 }
  }
}, schema);

describe('preserves', () => {

  it('first level string', () => {
    expect(obj.firstLevelString).toBe('string value');
  });

  it('first level number', () => {
    expect(obj.firstLevelNumber).toBe(4);
  });

  it('first level true', () => {
    expect(obj.firstLevelTrue).toBe(true);
  });

  it('first level false', () => {
    expect(obj.firstLevelFalse).toBe(false);
  });

  it('first level date', () => {
    expect(obj.firstLevelDate).toBe(date);
  });

  it('first level mixed', () => {
    expect(obj.firstLevelMixed).toEqual({ a: 1, b: 2 });
  });
});

describe('transforms', () => {

  it('nested string', () => {
    expect(obj['nested.string']).toBe('nested string value');
  });

  it('nested number', () => {
    expect(obj['nested.number']).toBe(2.8);
  });

  it('nested true', () => {
    expect(obj['nested.true']).toBe(true);
  });

  it('nested false', () => {
    expect(obj['nested.false']).toBe(false);
  });

  it('nested date', () => {
    expect(obj['nested.date']).toBe(date);
  });

  it('nested mixed', () => {
    expect(obj['nested.mixed']).toEqual({ c: 3, d: 4 });
  });
});
