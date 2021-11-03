interface DataSet { [key: string]: string }

export interface Dictionary {
  readonly set: DataSet
  translateText: (input: string) => string
  translateWord: (input: string) => string
}

const translateText = (set: DataSet) => (input: string): string =>
  input.split(' ')
    .map(translateWord(set))
    .filter(str => str !== '')
    .join(' ')

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
