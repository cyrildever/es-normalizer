import { Maybe, None, Some } from 'monet'

const re = RegExp(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f]))@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2,}[a-z0-9-]*|([a-z][a-z0-9-]+))|(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.?){4})$/) // eslint-disable-line no-control-regex

export const Email = (data: string): Maybe<string> => {
  const processed = data.trim().toLowerCase()
  if (processed.length > 255 || !re.test(processed)) {
    return None<string>()
  }
  return Some(processed)
}
