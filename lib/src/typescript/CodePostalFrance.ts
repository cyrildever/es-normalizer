import { Maybe, None, Some } from 'monet'

import { uniformize } from './index'

export const CodePostalFrance = (data: string): Maybe<string> => {
  const re = RegExp(/((0[1-9][0-9]|[1-8][0-9]{2})|(9[0-5][0-9])|(2[AB][0-9])|(97[1-6]))[0-9]{2}/)
  const uniformized = uniformize(data)
  if (uniformized.isNone() || !re.test(uniformized.some())) {
    return None<string>()
  }
  let processed = uniformized.some()
  const corse = RegExp(/^2[AB][0-9]{3}$/)
  if (corse.test(processed)) {
    processed = processed.replace(/[AB]/, '0')
  }
  return Some(processed)
}
