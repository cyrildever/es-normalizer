import { Maybe, Some } from 'monet'

import { AddressLine } from '.'

const al6Regex = RegExp('^((0[1-9]|[1-8][0-9]|9[0-5]|2[AB]|97[1-8]|98[46-9])([0-9]{3}))(.*)$')

export const AddressLine6 = (useDepartmentFrance = true) => (data: string): Maybe<string> =>
  AddressLine(false)(data)
    .flatMap(al6 => Maybe.fromNull(al6.match(al6Regex)))
    .filter(matches => !!matches[1]) // eslint-disable-line @typescript-eslint/strict-boolean-expressions
    .map(matches => [matches[1], matches[2], matches[4]] as const)
    .flatMap(([cp, dpt, city]) =>
      city.trim().startsWith(dpt)
        ? useDepartmentFrance
          ? Some([cp, city.trim()].join(' ').trim())
          : Some([cp, city.replace(dpt, '').trim()].join(' ').trim())
        : useDepartmentFrance
          ? Some([cp, dpt, city.trim()].join(' ').trim())
          : Some([cp, city.trim()].join(' ').trim())
    )
