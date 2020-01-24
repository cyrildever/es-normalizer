import * as chai from 'chai'
const should = chai.should()
import 'mocha'

import { normalize, uniformize, City, CodePostalFrance, Email, FirstName, Mobile, PhoneNumber } from '../../../lib/src/typescript/index'

describe('Normalize', () => {
  describe('uniformize', () => {
    it('should dismiss any weird character', () => {
      const data = ' cAfé#@~eT*%chocolAT )'
      const found = uniformize(data)
      const expected = "CAFE ET CHOCOLAT"
      found.some().should.equal(expected)
    })
  })

  describe('City', () => {
    it('should normalize safely', () => {
      let normalized = normalize('Jouy-en-Josas', City)
      normalized.some().should.equal('JOUY EN JOSAS')

      normalized = normalize('Paris      Cedex', City)
      normalized.some().should.equal('PARIS')

      normalized = normalize('CDX y', City)
      normalized.some().should.equal('Y')

      normalized = normalize('Paris Cedex  20', City)
      normalized.some().should.equal('PARIS')
    })
  })

  describe('CodePostalFrance', () => {
    it('should normalize safely', () => {
      let normalized = normalize('12345 ', CodePostalFrance)
      normalized.some().should.equal('12345')

      normalized = normalize('2A165', CodePostalFrance)
      normalized.some().should.equal('20165')
    })
    it('should reject any invalid code postal', () => {
      const normalized = normalize('aghfkhgk', CodePostalFrance)
      should.equal(normalized.isNone(), true)
    })
  })

  describe('Email', () => {
    it('should normalize safely', () => {
      const expected = 'cdever@edgewhere.fr'
      const data = ' cdever@EDGEWHERE.fr'
      const found = normalize(data, Email)
      found.some().should.equal(expected)
    })
    it('should reject any invalid email', () => {
      const data = 'pretty-long string that\'s not an email@at_all.com'
      let found = normalize(data, Email)
      should.equal(found.isNone(), true)

      const normalized = normalize('gregoire.albizzati@edge@where.fr', Email)
      should.equal(normalized.isNone(), true)

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
    it('should normalize safely', () => {
      let normalized = normalize('0623456789', Mobile)
      normalized.some().should.equal('+33 (0) 623 456 789')

      normalized = normalize('07-23-45-67-89', Mobile)
      normalized.some().should.equal('+33 (0) 723 456 789')
    })
    it('should reject landline phone numbers', () => {
      const normalized = normalize('01.23.45.67.89', Mobile)
      should.equal(normalized.isNone(), true)
    })
  })

  describe('PhoneNumber', () => {
    it('should normalize safely', () => {
      let normalized = normalize('0123456789', PhoneNumber)
      normalized.some().should.equal('+33 (0) 123 456 789')

      normalized = normalize('01-23-45-67-89', PhoneNumber)
      normalized.some().should.equal('+33 (0) 123 456 789')

      normalized = normalize('0033 0 1 23 45 67 89', PhoneNumber)
      normalized.some().should.equal('+33 (0) 123 456 789')

      // Mobile phones are phone numbers by definition
      normalized = normalize('06.23.45.67.89', PhoneNumber)
      normalized.some().should.equal('+33 (0) 623 456 789')
    })
    it('should reject invalid phone numbers', () => {
      let normalized = normalize('01-23-45-67-8-10', PhoneNumber)
      should.equal(normalized.isNone(), true)

      normalized = normalize('not-even-close-to-a-phone-number', PhoneNumber)
      should.equal(normalized.isNone(), true)
    })
  })
})
