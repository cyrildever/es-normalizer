import { Maybe, None, Some } from 'monet'

import { uniformize } from './index'

export const PhoneNumber = (data: string): Maybe<string> => {
  const uniformized = uniformize(data)
  if (uniformized.isNone()) {
    return None<string>()
  }
  // TODO Become international
  const re = RegExp(/^(((00)?(33)|0?(262)|0?(590)|0?(594)|0?(596))([^1-9]*)|0)?([^0-9]*)([\d]{3})([\d]{3})([\d]{3})$/)
  const matches = uniformized.some().replace(/\s/g, "").match(re)
  if (matches === null) {
    return None<string>()
  }
  let international = '+'
  if (matches[4] === undefined) {
    international += '33'
  } else {
    international += matches[4]
  }
  let prefix = '('
  if (matches[9] === undefined || matches[9] === '') {
    prefix += '0'
  } else {
    prefix += matches[9]
  }
  prefix += ')'
  if (matches[11] === undefined || matches[12] === undefined || matches[13] === undefined) {
    return None<string>()
  }
  const s = [international, prefix, matches[11], matches[12], matches[13]]
  return Some(s.join(" "))
}
