// Copyright 2018 Kensho Technologies, LLC.

import assert from 'assert'

import {it as test} from 'mocha'

import {getWindow, windowMock} from '.'

test('utils/windowUtils.getWindow', () => {
  assert.deepEqual(getWindow(), windowMock)
})
