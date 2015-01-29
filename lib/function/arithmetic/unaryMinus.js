'use strict';

var typed = require('typed-function');
var Complex = require('../../type/Complex');
var collection = require('../../type/collection');

/**
 * Inverse the sign of a value, apply a unary minus operation.
 *
 * For matrices, the function is evaluated element wise. Boolean values and
 * strings will be converted to a number. For complex numbers, both real and
 * complex value are inverted.
 *
 * Syntax:
 *
 *    math.unaryMinus(x)
 *
 * Examples:
 *
 *    math.unaryMinus(3.5);      // returns -3.5
 *    math.unaryMinus(-4.2);     // returns 4.2
 *
 * See also:
 *
 *    add, subtract, unaryPlus
 *
 * @param  {Number | BigNumber | Boolean | Complex | Unit | Array | Matrix | null} x Number to be inverted.
 * @return {Number | BigNumber | Complex | Unit | Array | Matrix} Returns the value with inverted sign.
 */
var unaryMinus = typed('unaryMinus', {
  'number': function (x) {
    return -x;
  },

  'Complex': function (x) {
    return new Complex(
        -x.re,
        -x.im
    );
  },

  'BigNumber': function (x) {
    return x.neg();
  },

  'Unit': function (x) {
    var res = x.clone();
    res.value = -x.value;
    return res;
  },

  'Array | Matrix': function (x) {
    return collection.deepMap(x, unaryMinus);
  }
});

module.exports = unaryMinus;