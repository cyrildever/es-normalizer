import { Maybe, Some } from 'monet'

import { uniformize, normalize } from './index'
import { CodePostalFrance } from './CodePostalFrance'

const re = RegExp(`^(0[1-9]|[1-8][0-9]|9[0-5]|2[AB]|97[1-8]|98[46-9])([0-9]*)$`)

export const DepartementFrance = (data: string): Maybe<string> =>
  uniformize(data)
    .filter(uniformized => !!uniformized)
    .flatMap(uniformized => Maybe.fromNull(uniformized.match(re)))
    .filter(matches => !!matches[1])
    .map(matches => matches[1])
    .flatMap(dpt => dpt === '20'
      ? normalize(data, CodePostalFrance)
        .map(cp => parseInt(cp))
        .map(cpInt => cpInt > 19999 && cpInt < 20200 ? '2A' : '2B')
      : Some(dpt)
    )
