import { Maybe } from 'monet'

import { uniformize } from './index'

// TODO Become international
const re = RegExp(/^(((00)?(33))|0)?([0]?)([0-9])([0-9]{2})([0-9]{3})([0-9]{3})$/)

/* eslint-disable @typescript-eslint/strict-boolean-expressions,no-extra-boolean-cast */
export const Mobile = (data: string): Maybe<string> =>
  uniformize(data)
    .flatMap(uniformized => Maybe.fromNull(uniformized.replace(/\s/g, '').match(re))) // eslint-disable-line @typescript-eslint/prefer-regexp-exec
    .filter(matches => !!matches[7] && !!matches[8] && !!matches[9] && ![matches[7], matches[8], matches[9]].join('').endsWith('00000000'))
    .filter(matches => !!matches[6] && matches[6] === '6' || matches[6] === '7')
    .map(matches => {
      const international = !!matches[4] ? `+${matches[4]}` : '+33'
      const prefix = !!matches[5] ? `(${matches[5]})` : '(0)'
      return [international, prefix, matches[6] + matches[7], matches[8], matches[9]].join(' ')
    })
/* eslint-enable @typescript-eslint/strict-boolean-expressions,no-extra-boolean-cast */
