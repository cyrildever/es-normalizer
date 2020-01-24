import { Maybe, None, Some } from 'monet'

import { uniformize } from './index'

export const Mobile = (data: string): Maybe<string> => {
    const uniformized = uniformize(data)
    if (uniformized.isNone()) {
        return None<string>()
    }
    const re = RegExp(/^(((00)?(33))|0)?([0]?)([\d])([\d]{2})([\d]{3})([\d]{3})$/)
    const matches = uniformized.some().replace(/\s/g, "").match(re)
    if (matches === null) {
        return None<string>()
    }
    // TODO Become international
    if (matches[6] === undefined || (matches[6] != '6' && matches[6] != '7')) {
        return None<string>()
    }
    let international = '+'
    if (matches[4] === undefined) {
        international += '33'
    } else {
        international += matches[4]
    }
    let prefix = '('
    if (matches[5] === undefined || matches[5] === '') {
        prefix += '0'
    } else {
        prefix += matches[5]
    }
    prefix += ')'
    if (matches[7] === undefined || matches[8] === undefined || matches[9] === undefined) {
        return None<string>()
    }
    const s = [international, prefix, matches[6] + matches[7], matches[8], matches[9]]
    return Some(s.join(" "))
}
