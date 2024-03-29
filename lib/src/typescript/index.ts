import { Maybe, None, Some } from 'ts-utls'

export const normalize = (data: string, normalizer: (d: string) => Maybe<string>): Maybe<string> => normalizer(data)

export const uniformize = (data: string): Maybe<string> => {
  const normalized = data.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  if (normalized === '') {
    return None<string>()
  }
  const uniformized = normalized.replace(/ß/g, 'ss')
    .replace(/ø/g, 'o')
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/-/g, ' ')
    .trim()
    .toUpperCase()
  if (uniformized === '') {
    return None<string>()
  }
  return Some(uniformized)
}

/**
 * Normalizer function to use as normalizer argument for any kind of data when no specific normalizer exists
 * 
 * @example
 * import * as esNormalizer from 'es-normalizer'
 * const maybeNormalized = esNormalizer.normalize('my data', esNormalizer.Any)
 * 
 * @param {string} data - The input to normalize
 * @returns {Maybe<string} Some NFD-normalized and upper-cased string if any.
 * */
export const Any = (data: string): Maybe<string> =>
  uniformize(data)

export * from './AddressLine'
export * from './AddressLine6'
export * from './City'
export * from './CodePostalFrance'
export * from './DateOfBirth'
export * from './DepartementFrance'
export * from './Dictionary'
export * from './Email'
export * from './FirstName'
export * from './Mobile'
export * from './PhoneNumber'
export * from './StreetNumber'
export * from './Title'
