import { Maybe, Some } from 'monet'

import { uniformize } from './index'
import { Dictionary, addressDico, getSet } from './Dictionary'

const set = getSet(addressDico)
const dic = Dictionary(set)
const re = RegExp('^([0-9]*)\s*(.*)$') // eslint-disable-line no-useless-escape

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable no-extra-boolean-cast */

export const StreetNumber = (data: string): Maybe<string> =>
  Maybe.fromNull(data.trim().match(re)) // eslint-disable-line @typescript-eslint/prefer-regexp-exec
    .filter(matches => matches.length > 1)
    .flatMap(matches => !!matches[2]
      ? uniformize(matches[2])
        .map(dic.translateText)
        .map(compUni => matches[1] + compUni)
      : Some(matches[1])
    )

/* eslint-enable no-extra-boolean-cast */
/* eslint-enable @typescript-eslint/strict-boolean-expressions */
