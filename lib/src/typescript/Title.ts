import { Maybe, None, Some } from 'monet'

import { uniformize } from './index'

import { Dictionary, titleDico, getSet } from './Dictionary'

const set = getSet(titleDico)
const dic = Dictionary(set)

const CODE_F = '2'
const CODE_M = '1'
const CODE_U = '0'

export const Title = (data: string): Maybe<string> =>
  uniformize(data).flatMap((translated: string) => {
    switch (translated) {
      case 'H':
      case 'M':
        return Some(CODE_M)
      case 'F':
        return Some(CODE_F)
      case 'U':
        return Some(CODE_U)
      default: {
        const re = RegExp(/\d+/g)
        const found = dic.translateText(translated).match(re)
        if (found === undefined) {
          return None<string>()
        } else if (found!.length == 1) {
          return Some(found![0])
        } else {
          return Some(CODE_U)
        }
      }
    }
  })