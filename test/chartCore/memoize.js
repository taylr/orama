// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {getMemoizeDimArrays} from '../../src/chartCore/memoize'

test('Chart/memoize.getMemoizeDimArrays', () => {
  const memoizeAddDimArrays = getMemoizeDimArrays()
  const props = {
    localAccessors: {x: 'x'},
    data: [{x: 1}, {x: 2}, {x: 3}],
    x: 'x',
  }
  const result = memoizeAddDimArrays(props)
  const expected = memoizeAddDimArrays(props).xArray
  const actual = result.xArray
  assert.equal(expected, actual)
})
