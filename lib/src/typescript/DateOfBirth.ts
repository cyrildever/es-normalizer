import moment from 'moment'
import { Maybe, None, Some } from 'ts-utls'

export const FRENCH_DATE: Format = 'DD/MM/YYYY'
export const ISO_DATE: Format = 'YYYYMMDD'

export const Timestamp = 'timestamp'
type Timestamp = typeof Timestamp

export const Milliseconds = 'timestamp_millis'
type Milliseconds = typeof Milliseconds

type Format = Timestamp | Milliseconds | string // eslint-disable-line @typescript-eslint/no-redundant-type-constituents

// TODO Enrich with other separators?
const separators = RegExp(/[-:/\s]+/g)

/**
 * Normalize a date of birth (by default the French way, ie. using the `DD/MM/YYYY` format)
 * 
 * @example
 * import * as esNormalizer from 'es-normalizer'
 * const normalized = esNormalizer.normalize('24/04/2010', esNormalizer.DateOfBirth('DD/MM/YYYY', esNormalizer.ISO_DATE))
 * // 20102404
 * console.log(normalized.getOrElse(''))
 */
export const DateOfBirth = (input?: Format, output?: Format) => (data: string): Maybe<string> => {
  const inputFormat = input === undefined || input === '' ? ISO_DATE : input
  const outputFormat = output === undefined || output === '' ? FRENCH_DATE : output
  let d: moment.Moment
  if (inputFormat.toLowerCase() === Timestamp) {
    d = moment.unix(parseInt(data))
  } else if (inputFormat.toLowerCase() === Milliseconds) {
    d = moment(parseInt(data))
  } else {
    d = moment(data, inputFormat.replaceAll(separators, '-').toUpperCase())
  }
  if (!d.isValid()) {
    return None<string>()
  }
  const out = d.format(outputFormat.replaceAll(separators, '-').toUpperCase())
  const matches = outputFormat.match(separators)
  if (matches === null) {
    return Some(out)
  }
  return Some(out.replaceAll(/-/g, matches[0]))
}
