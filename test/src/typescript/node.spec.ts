import * as chai from 'chai'
chai.should()
import 'mocha'

import {
  normalize, uniformize, Any,
  AddressLine, City, CodePostalFrance, DateOfBirth, DepartementFrance, Email, FirstName, Mobile, PhoneNumber, Title,
  TIMESTAMP, TIMESTAMP_MILLIS, ISO_FORMAT, FRENCH_FORMAT
} from '../../../lib/src/typescript/index'

describe('Normalize', () => {
  describe('uniformize', () => {
    it('should dismiss any weird character', () => {
      const data = ' cAfé#@~eT*%chocolAT )'
      const found = uniformize(data)
      const expected = "CAFE ET CHOCOLAT"
      found.some().should.equal(expected)
    })
  })

  describe('AddressLine', () => {
    it('should normalize safely any type of address line', () => {
      // French address line 2
      let normalized = normalize('c/o Mr et Mme Dupont', AddressLine)
      normalized.some().should.equal('C O MR MME DUPONT')

      // French address line 3
      normalized = normalize('Bât. 4, escalier G', AddressLine)
      normalized.some().should.equal('BAT 4 ESC G')

      // French address line 4
      normalized = normalize('128 r du Faubourg Saint Honoré ', AddressLine)
      normalized.some().should.equal('128 RUE FBG ST HONORE')

      normalized = normalize('*** rue \nHenner', AddressLine)
      normalized.some().should.equal('RUE HENNER')

      normalized = normalize('$µ%*+^)@', AddressLine)
      normalized.isNone().should.be.true

      // French address line 5
      normalized = normalize('Lieu-dit du domaine Vert', AddressLine)
      normalized.some().should.equal('LIEU DIT DOM VERT')

      // French address line 6
      normalized = normalize('$.75009        Paris', AddressLine)
      normalized.some().should.equal('75009 PARIS')

      normalized = normalize('75948 Paris Cedex 19', AddressLine)
      normalized.some().should.equal('75948 PARIS CDX 19')
    })
  })

  describe('Any', () => {
    it('should normalize safely', () => {
      const normalized = normalize('Any string to normalize().', Any)
      normalized.some().should.equal('ANY STRING TO NORMALIZE')
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
      normalized.isNone().should.be.true
    })
  })

  describe('DateOfBirth', () => {
    it('should parse a date correctly', () => {
      let normalized = normalize('1564/04/23', DateOfBirth, 'yyyy/MM/dd')
      normalized.some().should.equal('23/04/1564')

      normalized = normalize('95/04/23', DateOfBirth, 'yy/MM/dd')
      normalized.some().should.equal('23/04/1995')

      normalized = normalize('1472720661', DateOfBirth, TIMESTAMP)
      normalized.some().should.equal('01/09/2016')

      normalized = normalize('1472720661276', DateOfBirth, TIMESTAMP_MILLIS)
      normalized.some().should.equal('01/09/2016')

      normalized = normalize('10 MAY 1970', DateOfBirth, 'DD MMM YYYY', ISO_FORMAT)
      normalized.some().should.equal('19700510')

      // Hours, minutes and seconds are not supported...
      normalized = normalize('24/04/2010 12:00:00', DateOfBirth, 'dd/MM/yyyy hh:mm:ss')
      normalized.isNone().should.be.true
      // ... avoid passing them in the format string to make it work
      normalized = normalize('24/04/2010 12:00:00', DateOfBirth, 'dd/MM/yyyy')
      normalized.some().should.equal('24/04/2010')
    })
    it('should reject any invalid date', () => {
      let normalized = normalize('1969', DateOfBirth, FRENCH_FORMAT)
      normalized.isNone().should.be.true

      normalized = normalize('not-a-date', DateOfBirth)
      normalized.isNone().should.be.true

      normalized = normalize('not-a-timestamp', DateOfBirth, TIMESTAMP)
      normalized.isNone().should.be.true
    })
  })

  describe('DepartementFrance', () => {
    it('should extract the appropriate departement number', () => {
      let normalized = normalize('20167', DepartementFrance)
      normalized.some().should.equal('2A')

      normalized = normalize('  75009 ', DepartementFrance)
      normalized.some().should.equal('75')
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
      found.isNone().should.be.true

      const normalized = normalize('gregoire.albizzati@edge@where.fr', Email)
      normalized.isNone().should.be.true

      const tooShort = 't@t.t'
      found = normalize(tooShort, Email)
      found.isNone().should.be.true
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
      normalized.isNone().should.be.true

      normalized = normalize('', FirstName)
      normalized.isNone().should.be.true
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
      normalized.isNone().should.be.true
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
      normalized.isNone().should.be.true

      normalized = normalize('not-even-close-to-a-phone-number', PhoneNumber)
      normalized.isNone().should.be.true
    })
  })

  describe('Title', () => {
    it('should return the appropriate codes', () => {
      let normalized = normalize('Mademoiselle', Title)
      normalized.some().should.equal('2')

      normalized = normalize('Docteur', Title)
      normalized.some().should.equal('0')

      normalized = normalize(' ', Title)
      normalized.isNone().should.be.true

      normalized = normalize('1', Title)
      normalized.some().should.equal('1')

      normalized = normalize('Monsieur et Madame', Title)
      normalized.some().should.equal('0')
    })
  })
})
