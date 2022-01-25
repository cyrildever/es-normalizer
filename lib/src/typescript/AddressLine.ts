import { Maybe } from 'monet'

import { uniformize } from './index'
import { Dictionary, addressDico, getSet, titleDico } from './Dictionary'

const setAdrsDic = getSet(addressDico)
const adrsDico = Dictionary(setAdrsDic)

const setTitleDic = getSet(titleDico)
const ttlDico = Dictionary(setTitleDic)

export const AddressLine = (transformTitle = false) => (data: string): Maybe<string> => {
  const addressLine = uniformize(data).map(adrsDico.translateText)
  return transformTitle === true
    ? uniformize(data).map(ttlDico.translateText)
    : addressLine
}
