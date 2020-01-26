import { Maybe, Some } from 'monet'

import { uniformize } from './index'
import { Dictionary, addressDico, getSet } from './Dictionary'

const set = getSet(addressDico)
const dic = Dictionary(set)

export const City = (data: string): Maybe<string> =>
  uniformize(data).map(dic.translateText)
    .flatMap(found => Some(found.replace(/CDX(\s+[0-9]+)*/, '').replace(/\s+/g, ' ').trim()))
