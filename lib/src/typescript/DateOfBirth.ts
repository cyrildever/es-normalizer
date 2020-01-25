import moment from 'moment'
import { Maybe, None, Some } from 'monet'

export const FRENCH_FORMAT = 'DD/MM/YYYY'
export const ISO_FORMAT = 'YYYYMMDD'

export const TIMESTAMP = 'timestamp'
export const TIMESTAMP_MILLIS = 'timestamp_millis'

// TODO Enrich with other separators?
const separators = RegExp(/[-:\/\s]+/g)

/**
 * Normalize a date of birth (by default the French way, ie. using the `DD/MM/YYYY` format)
 * 
 * @example
 * import * as esNormalizer from 'es-normalizer'
 * const normalized = esNormalizer.normalize('24/04/2010', esNormalizer.DateOfBirth, 'DD/MM/YYYY', esNormalizer.ISO_FORMAT)
 * // 20102404
 * console.log(normalized.some())
 * 
 * @param data - The input string
 * @param params - An list of arguments to use to format the output appropriately:
 * - the first item is the string format of the input string (defaut to ISO format: `YYYYMMDD`);
 * - the second item is the string format for the output (default to French date: `DD/MM/YYYY`).
 * 
 * The input format could be a `timestamp` or a `timestamp_millis`.
 */
export const DateOfBirth = (input: string, ...params: ReadonlyArray<string>): Maybe<string> => {
  const inputFormat = params.length > 0 ? params[0] : ISO_FORMAT
  const outputFormat = params.length > 1 ? params[1] : FRENCH_FORMAT
  let d: moment.Moment
  if (inputFormat.toLowerCase() === TIMESTAMP) {
    d = moment.unix(parseInt(input))
  } else if (inputFormat.toLowerCase() === TIMESTAMP_MILLIS) {
    d = moment(parseInt(input))
  } else {
    d = moment(input, inputFormat.replace(separators, '-').toUpperCase())
  }
  if (!d.isValid()) {
    return None<string>()
  }
  let output = d.format(outputFormat.replace(separators, '-').toUpperCase())
  const matches = outputFormat.match(separators)
  if (matches === null) {
    return Some(output)
  }
  return Some(output.replace(/-/g, matches[0]))
}
