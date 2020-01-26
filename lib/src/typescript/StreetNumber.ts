import { Maybe, None, Some } from 'monet'

import { uniformize } from './index'
import { Dictionary, addressDico, getSet } from './Dictionary'

const set = getSet(addressDico)
const dic = Dictionary(set)

export const StreetNumber = (data: string): Maybe<string> => {
  const re = RegExp(`^([0-9]*)\s*(.*)$`)
  const matches = data.trim().match(re)
  if (matches === null || matches.length < 2) {
    return None<string>()
  }
  const num = matches[1]
  let compUni = ''
  if (matches[2] !== undefined) {
    const comp = uniformize(matches[2])
    compUni = dic.translateText(comp.getOrElse(''))
  }
  return Some(num + compUni)
}
