import { Maybe, None, Some } from 'monet'

import { uniformize, normalize } from './index'
import { CodePostalFrance } from './CodePostalFrance'

export const DepartementFrance = (data: string): Maybe<string> => {
  const uniformized = uniformize(data)
  if (uniformized.isNone()) {
    return None<string>()
  }
  const re = RegExp(`^(0[1-9]|[1-8][0-9]|9[0-5]|2[AB]|97[1-8]|98[46-9])([0-9]*)$`)
  const matches = uniformized.some().match(re)
  if (matches === null || matches[1] === undefined) {
    return None<string>()
  }
  let dpt = matches[1]
  if (dpt === '20') {
    const cp = normalize(data, CodePostalFrance)
    if (!cp.isNone()) {
      const cpInt = parseInt(cp.some())
      if (cpInt > 19999 && cpInt < 20200) {
        dpt = '2A'
      } else if (cpInt > 20199 && cpInt < 20621) {
        dpt = '2B'
      }
    }
  }
  return Some(dpt)
}
