import { Maybe, None, Some } from 'monet'

export const normalize = (data: string, normalizer: (d: string) => Maybe<string>) => normalizer(data)

export const uniformize = (data: string): Maybe<string> => {
  const normalized = data.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  if (normalized === "") {
    return None<string>()
  }
  const uniformized = normalized.replace(/ß/g, "ss")
    .replace(/ø/g, "o")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/-/g, " ")
    .trim()
    .toUpperCase()
  if (uniformized === "") {
    return None<string>()
  }
  return Some(uniformized)
}

export * from './AddressLine'
export * from './City'
export * from './CodePostalFrance'
export * from './Dictionary'
export * from './Email'
export * from './FirstName'
export * from './Mobile'
export * from './PhoneNumber'
