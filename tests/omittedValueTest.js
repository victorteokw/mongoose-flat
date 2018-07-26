const flat = require('../index');
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  val: String,
  nested: {
    val: String
  }
});

const obj = flat({
  _id: '123456789012345678901234',
  nested: {}
}, schema);

describe('omitted value', () => {

  it('preserves _id if present', () => {
    expect(obj._id).toBe('123456789012345678901234');
  });

  it('ignore for omitted value', () => {
    expect('val' in obj).toBe(false);
  });

  it('ignore for omitted value', () => {
    expect('nested.val' in obj).toBe(false);
  });

  it('has the shape', () => {
    expect(obj).toEqual({ _id: '123456789012345678901234' });
  });
});
