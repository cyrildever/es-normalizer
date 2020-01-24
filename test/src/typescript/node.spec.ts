import * as chai from 'chai'
const should = chai.should()
import 'mocha'

import { normalize, uniformize, Email, FirstName, Mobile } from '../../../lib/src/typescript/index'

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

  describe('FirstName', () => {
    it('should work as expected', () => {
      let normalized = normalize('Cyril', FirstName)
      normalized.some().should.equal('CYRIL')

      normalized = normalize('J Louis', FirstName)
      normalized.some().should.equal('JEAN LOUIS')

      normalized = normalize('Unknown', FirstName)
      normalized.some().should.equal('UNKNOWN')

      normalized = normalize('#@~*%', FirstName)
      should.equal(normalized.isNone(), true)

      normalized = normalize('', FirstName)
      should.equal(normalized.isNone(), true)
    })
  })

  describe('Mobile', () => {
    it('should normalize correctly', () => {
      let normalized = normalize('0623456789', Mobile)
      normalized.some().should.equal('+33 (0) 623 456 789')

      normalized = normalize('07-23-45-67-89', Mobile)
      normalized.some().should.equal('+33 (0) 723 456 789')

      // Valid landline phone numbers aren't mobile phones
      normalized = normalize('01.23.45.67.89', Mobile)
      should.equal(normalized.isNone(), true)
    })
  })
})
