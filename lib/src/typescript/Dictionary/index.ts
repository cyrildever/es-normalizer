export interface Dictionary {
  set: { [key: string]: string }
  translateText: (input: string) => string
  translateWord: (input: string) => string
}

const translateText = (set: { [key: string]: string }) => (input: string): string =>
  input.split(' ')
    .map((word: string) => translateWord(set)(word))
    .join(' ')

const translateWord = (set: { [key: string]: string }) => (input: string): string =>
  set[input] || input

export const Dictionary = (set: { [key: string]: string }): Dictionary => ({
  set,
  translateText: translateText(set),
  translateWord: translateWord(set)
})

export const getSet = (data: string) =>
  Object.fromEntries(data.split(/\n/g).map(line => line.split(/\t/g, 2)))

export * from './address.dico'
export * from './firstname.dico'
export * from './gender.dico'
export * from './title.dico'
