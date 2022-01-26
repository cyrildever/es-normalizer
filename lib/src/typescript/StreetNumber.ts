import { Maybe, Some } from 'monet'

import { uniformize } from './index'
import { Dictionary, addressDico, getSet } from './Dictionary'

const set = getSet(addressDico)
const dic = Dictionary(set)
const re = RegExp('^([0-9]*)\s*(.*)$') // eslint-disable-line no-useless-escape

export const StreetNumber = (data: string): Maybe<string> =>
  Maybe.fromNull(re.exec(data.trim()))
    .filter(matches => matches.length > 1)
    .flatMap(matches => matches[2]
      ? uniformize(matches[2])
        .map(dic.translateText)
        .map(compUni => matches[1] + compUni.split(' ')[0])
      : Some(matches[1])
    )
