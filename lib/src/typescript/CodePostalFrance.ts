import { Maybe } from 'monet'

import { uniformize } from './index'

const re = new RegExp(/((0[1-9][0-9]|[1-8][0-9]{2})|(9[0-5][0-9])|(2[AB][0-9])|(97[1-6]))[0-9]{2}/)
const corse = new RegExp(/^2[AB][0-9]{3}$/)

export const CodePostalFrance = (data: string): Maybe<string> =>
  uniformize(data)
    .filter(uniformized => re.test(uniformized))
    .map(processed => corse.test(processed) ? processed.replace(/[AB]/, '0') : processed)
