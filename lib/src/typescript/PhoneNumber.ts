import { Maybe } from 'ts-utls'

import { uniformize } from './index'

// TODO Become international
const re = RegExp(/^(((00)?(33)|0?(262)|0?(590)|0?(594)|0?(596))([^1-9]*)|0)?([^0-9]*)([0-9]{3})([0-9]{3})([0-9]{3})$/)

/* eslint-disable @typescript-eslint/strict-boolean-expressions,no-extra-boolean-cast */
export const PhoneNumber = (data: string): Maybe<string> =>
  uniformize(data)
    .flatMap(uniformized => Maybe.fromNull(uniformized.replace(/\s/g, '').match(re))) // eslint-disable-line @typescript-eslint/prefer-regexp-exec
    .filter(matches => !!matches[11] && !!matches[12] && !!matches[13] && ![matches[11], matches[12], matches[13]].join('').endsWith('00000000'))
    .map(matches => {
      const international = !!matches[4] ? `+${matches[4]}` : '+33'
      const prefix = !!matches[9] ? `(${matches[9]})` : '(0)'
      return [international, prefix, matches[11], matches[12], matches[13]].join(' ')
    })

/* eslint-enable @typescript-eslint/strict-boolean-expressions,no-extra-boolean-cast */
