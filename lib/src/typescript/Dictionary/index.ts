export interface Dictionary {
  set: {[key: string]: string}
  translateWord: (input: string) => string
}

const translateWord = (set: {[key: string]: string}) => (input: string): string =>
  set[input] || input

export const Dictionary = (set: {[key: string]: string}): Dictionary => ({
  set,
  translateWord: translateWord(set)
})

export const getSet = (data:string) =>
  Object.fromEntries(data.split(/\n/g).map(line => line.split(/\t/g, 2)))

export * from './firstname.dico'
