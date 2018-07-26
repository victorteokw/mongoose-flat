const flat = require('../index');
const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  simpleDeclare: String,
  typeDeclare: { type: String, required: true },
  typeDeclaredMixed: { type: mongoose.Schema.Types.Mixed, required: true },
  simpleNested: {
    simpleDeclare: String,
    typeDeclare: { type: String, required: true }
  },
  schemaNested: new mongoose.Schema({
    simpleDeclare: String,
    typeDeclare: { type: String, required: true }
  })
});

const obj = flat({
  simpleDeclare: 'simple',
  typeDeclare: 'type',
  typeDeclaredMixed: { a: 1, b: 2 },
  simpleNested: {
    simpleDeclare: 'declare',
    typeDeclare: 'type declared'
  },
  schemaNested: {
    simpleDeclare: 'simple declare',
    typeDeclare: 'type string'
  }
}, schema);

describe('supports value with ', () => {

  it('simple function declare', () => {
    expect(obj.simpleDeclare).toBe('simple');
  });

  it('type declare', () => {
    expect(obj.typeDeclare).toBe('type');
  });

  it('type declared mixed', () => {
    expect(obj.typeDeclaredMixed).toEqual({ a: 1, b: 2 });
  });

  it('object nested', () => {
    expect(obj['simpleNested.simpleDeclare']).toBe('declare');
    expect(obj['simpleNested.typeDeclare']).toBe('type declared');
  });

  it('schema nested', () => {
    expect(obj['schemaNested.simpleDeclare']).toBe('simple declare');
    expect(obj['schemaNested.typeDeclare']).toBe('type string');
  });

});
