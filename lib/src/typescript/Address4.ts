import { Maybe, Some } from 'monet'

import { uniformize } from './index'

import { Dictionary, addressDico, getSet } from './Dictionary'

const set = getSet(addressDico)
const dic = Dictionary(set)

export const Address4 = (data: string): Maybe<string> =>
  uniformize(data).map(dic.translateText)
