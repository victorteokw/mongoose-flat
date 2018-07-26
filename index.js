const mongoose = require('mongoose');
const isPlainObject = require('is-plain-object');

/**
 * Flatten user input according to model or schema.
 * @constructor
 * @param {object} input - The input object.
 * @param {object} modelOrSchema - The mongoose model class or schema.
 * @return {object} Flattened user input.
 */
const flat = (input, modelOrSchema) => {
  const tree = (modelOrSchema.schema && modelOrSchema.base)
    ? modelOrSchema.schema.tree
    : modelOrSchema.tree;
  const retval = {};
  const fetchValue = (baseObj, path) => {
    let retval = baseObj;
    while (path.length) {
      const key = path.shift();
      retval = retval[key];
    }
    return retval;
  };
  const set = (retval, input, key, path) => {
    const base = path.join('.');
    const val = fetchValue(input, path.concat(key));
    const newKey = base.length ? base + '.' + key : key;
    retval[newKey] = val;
  };
  const apply = (tree, input, path) => {
    Object.keys(tree).forEach((key) => {
      const item = tree[key];
      const value = fetchValue(input, path.concat(key));
      if (typeof value === 'undefined') {
        return;
      }
      // Ignore virtual types
      if (item instanceof mongoose.VirtualType) return;
      // Simple copy primitive types.
      // These types are defined in mongoose.Schema.Types.
      if (item.schemaName) {
        set(retval, input, key, path);
        return;
      }
      // We won't handle arrays
      // Simply copy
      if (Array.isArray(item)) {
        set(retval, input, key, path);
        return;
      }
      // Primitive type field with 'type'
      if (item.type) {
        set(retval, input, key, path);
        return;
      }
      // Primitive type with class specified
      if (item.constructor === Function) {
        set(retval, input, key, path);
        return;
      }
      // Subschema
      if (item instanceof mongoose.Schema) {
        apply(item.tree, input, path.concat(key));
        return;
      }
      // Nested object
      if (isPlainObject(item)) {
        apply(item, input, path.concat(key));
        return;
      }
      console.log('Unhandled case: ', item, input, path);
      throw `Unhandled case`;
    });
  };
  apply(tree, input, []);
  return retval;
};

module.exports = flat;
