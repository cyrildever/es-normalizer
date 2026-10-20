interface DataSet { [key: string]: string }

export interface Dictionary {
  readonly set: DataSet
  translateText: (input: string) => string
  translateWord: (input: string) => string
}

// A key of several words translates them together, the longest first
const translateText = (set: DataSet) => {
  const phrases = Object.keys(set)
    .filter(key => key.includes(' '))
    .map(key => key.split(' '))
    .sort((a, b) => b.length - a.length)
  const translate = (words: Array<string>): Array<string> => {
    if (words.length === 0) return []
    const phrase = phrases.find(p => p.every((word, i) => words[i] === word))
    return phrase !== undefined && set[phrase.join(' ')] !== undefined
      ? [set[phrase.join(' ')], ...translate(words.slice(phrase.length))]
      : [translateWord(set)(words[0]), ...translate(words.slice(1))]
  }
  return (input: string): string =>
    translate(input.split(' '))
      .filter(str => str !== '')
      .join(' ')
}

const translateWord = (set: DataSet) => (input: string): string =>
  set[input] === undefined ? input : set[input]

export const Dictionary = (set: DataSet): Dictionary => ({
  set,
  translateText: translateText(set),
  translateWord: translateWord(set)
})

export const getSet = (data: string): DataSet =>
  Object.fromEntries(data.split(/\n/g).map(line => line.split(/\t/g, 2))) as DataSet

export * from './address.dico'
export * from './firstname.dico'
export * from './title.dico'
