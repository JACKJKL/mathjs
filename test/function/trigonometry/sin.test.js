var assert = require('assert'),
    error = require('../../../lib/error/index'),
    math = require('../../../index'),
    approx = require('../../../tools/approx'),
    pi = math.pi,
    complex = math.complex,
    matrix = math.matrix,
    unit = math.unit,
    sin = math.sin;

describe('sin', function() {
  it('should return the sine of a boolean', function () {
    approx.equal(sin(true), 0.841470984807897);
    approx.equal(sin(false), 0);
  });

  it('should return the sine of null', function () {
    approx.equal(sin(null), 0);
  });

  it('should return the sine of a number', function() {
    approx.equal(sin(0), 0);
    approx.equal(sin(pi/8), 0.382683432365090);
    approx.equal(sin(pi/4), Math.SQRT2/2);
    approx.equal(sin(pi/2), 1);
    approx.equal(sin(pi*3/4), 0.707106781186548);
    approx.equal(sin(pi), 0);
    approx.equal(sin(pi*5/4), -0.707106781186548);
    approx.equal(sin(pi*3/2), -1);
    approx.equal(sin(pi*7/4), -0.707106781186548);
    approx.equal(sin(pi*2), 0);
  });

  it('should return the sine of a bignumber', function() {
    var bigmath = math.create({number: 'bignumber', precision: 242});
    assert.deepEqual(bigmath.sin(bigmath.bignumber(0)), bigmath.bignumber(0));
    
    // 103.64 % tau = 3.109... <- pretty close to the pi boundary
    assert.deepEqual(bigmath.sin(bigmath.bignumber(103.64)).toString(), '0.032551816956616158442731315994267213051204459121689332893471030' +
                                                                          '714804383298805501395839512341888732261080924779366105855493575' +
                                                                          '835362891900420559398509489530577719840860106717522689249606121' +
                                                                          '2602629134186583352145117086874446046421403346033616');
    assert.deepEqual(bigmath.sin(bigmath.bignumber(-103.64)).toString(), '-0.0325518169566161584427313159942672130512044591216893328934710' +
                                                                            '3071480438329880550139583951234188873226108092477936610585549' +
                                                                            '3575835362891900420559398509489530577719840860106717522689249' +
                                                                            '6061212602629134186583352145117086874446046421403346033616');
    bigmath.config({precision: 15});

    var bigPi = bigmath.pi;
    var result = bigmath.SQRT2.div(2).toString();
    assert.deepEqual(bigmath.sin(bigPi.div(4)).toString(), result);
    assert.deepEqual(bigmath.sin(bigPi.div(2)).toString(), '1');
    assert.deepEqual(bigmath.sin(bigPi.times(3).div(4)).toString(), result);
    assert.deepEqual(bigmath.sin(bigPi).toString(), '0');
    assert.deepEqual(bigmath.sin(bigPi.times(5).div(4)).toString(), '-'+result);
    assert.deepEqual(bigmath.sin(bigPi.times(3).div(2)).toString(), '-1');
    assert.deepEqual(bigmath.sin(bigPi.times(7).div(4)).toString(), '-'+result);
    assert.deepEqual(bigmath.sin(bigPi.times(2)).toString(), '0');
    assert.deepEqual(bigmath.sin(bigmath.tau).toString(), '0');
    assert.deepEqual(bigmath.sin(bigmath.tau.times(2)).toString(), '0');
  });

  it('should return the sine of a complex number', function() {
    var re = 9.15449914691143,
        im = 4.16890695996656;
    approx.deepEqual(sin(complex('2+3i')), complex(re, -im));
    approx.deepEqual(sin(complex('2-3i')), complex(re, im));
    approx.deepEqual(sin(complex('-2+3i')), complex(-re, -im));
    approx.deepEqual(sin(complex('-2-3i')), complex(-re, im));
    approx.deepEqual(sin(complex('i')), complex(0, 1.175201193643801));
    approx.deepEqual(sin(complex('1')), complex(0.841470984807897, 0));
    approx.deepEqual(sin(complex('1+i')), complex(1.298457581415977, 0.634963914784736));
    assert.deepEqual(sin(complex('1e-50i')), complex(0, 1e-50));
  });

  it('should return the sine of an angle', function() {
    approx.equal(sin(unit('45deg')), 0.707106781186548);
    approx.equal(sin(unit('-45deg')), -0.707106781186548);
  });

  it('should throw an error if called with an invalid unit', function() {
    assert.throws(function () {sin(unit('5 celsius'))});
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {sin('string')});
  });

  var sin123 = [0.84147098480789, 0.909297426825682, 0.141120008059867];

  it('should return the sin of each element of an array', function() {
    approx.deepEqual(sin([1,2,3]), sin123);
  });

  it('should return the sin of each element of a matrix', function() {
    approx.deepEqual(sin(matrix([1,2,3])), matrix(sin123));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {sin()}, error.ArgumentsError);
    assert.throws(function () {sin(1, 2)}, error.ArgumentsError);
  });

});