import * as chai from 'chai'
const should = chai.should()
import 'mocha'

import { Email, normalize, uniformize } from '../../../lib/src/typescript/index'

describe('Normalize', () => {
  describe('uniformize', () => {
    it('should dismiss any weird character', () => {
      const data = ' cAfé#@~eT*%chocolAT )'
      const found = uniformize(data)
      const expected = "CAFE ET CHOCOLAT"
      found.some().should.equal(expected)
    })
  })

  describe('Email', () => {
    it('should normalize safely', () => {
      const expected = 'cdever@edgewhere.fr'
      const data = ' cdever@EDGEWHERE.fr'
      const found = normalize(data, Email)
      found.some().should.equal(expected)
    })
    it('should reject invalid email', () => {
      const data = 'pretty-long string that\'s not an email@at_all.com'
      let found = normalize(data, Email)
      should.equal(found.isNone(), true)

      const tooShort = 't@t.t'
      found = normalize(tooShort, Email)
      should.equal(found.isNone(), true)
    })
    it('should not change a valid e-mail', () => {
      const ref = 'cdever@edgewhere.fr'
      const found = normalize(ref, Email)
      found.some().should.equal(ref)
    })
  })
})
