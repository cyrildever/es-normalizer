import { Maybe } from 'ts-utls'

import { uniformize } from './index'
import { Dictionary, firstNameDico, getSet } from './Dictionary'

const set = getSet(firstNameDico)
const dic = Dictionary(set)

export const FirstName = (data: string): Maybe<string> =>
  uniformize(data).map(dic.translateWord)
