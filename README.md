# es-normalizer

![GitHub tag (latest by date)](https://img.shields.io/github/v/tag/cyrildever/es-normalizer)
![npm](https://img.shields.io/npm/dw/es-normalizer)
![GitHub last commit](https://img.shields.io/github/last-commit/cyrildever/es-normalizer)
![GitHub issues](https://img.shields.io/github/issues/cyrildever/es-normalizer)
![NPM](https://img.shields.io/npm/l/es-normalizer)

This is a TypeScript normalization library for contact data (address, phones, etc.) adapted from [Edgewhere](https://www.edgewhere.fr)'s Empreinte Sociométrique patented normalizers. It's working in both the browser and a NodeJS environment.

### Motivation

When it comes to hashing data, the necessary uniqueness of the source sometimes makes it hard to compare two hashed data, mostly if dealing with postal address. This library helps normalizing any contact data (the postal or e-mail address, the mobile or landline phone number, the title, names or date of birth of an individual) that would feed any hashing algorithm to make hash comparison always trustable.
It's based on the work for the Empreinte Sociométrique&trade; patented by Cyril Dever for Edgewhere. For more information on the latter, please [contact us](mailto:contact@edgewhere.fr).

You might also want to read our [white paper](documentation/src/latex/es_whitepaper.pdf).


### Usage

```
npm i es-normalizer
```

*IMPORTANT*: as of this version, most normalizers are for use on French data.

To get a normalized string, you simply need to use the `normalize()` method passing it the data, a normalizer function and eventual arguments.
There are currently eleven specific normalizer functions and a generic one:
* `Any`: the generic normalizer should be used if no specific normalizer exists;
* `AddressLine`: pass any address line through it to get a normalized address, eg. `8, rue Henner` becomes `8 RUE HENNER`, and eventually `true` as parameter when trying to normalize a French address line 1 to also transform the title, eg. `Monsieur Cyril Dever` should then become `1 CYRIL DEVER` when passed `true` instead of `MONSIEUR CYRIL DEVER` for the default behaviour;
* `AddressLine6`: the French address line 6 with the department inserted in between the zip code and the city as in the Empreinte Sociométrique implementation (eg. `75009 75 PARIS`);
* `City`: for normalizing city names (it removes any Cedex mention in French address, for instance);
* `CodePostalFrance`: for French zip code;
* `DateOfBirth`: pass a date and up to two parameters: the input format (eg. `YYYY-MM-DD`) and the output format wished (eg. `normalizer.ISO_FORMAT`), the default values being respectively the ISO format and the French date format;
* `DepartementFrance`: extract the French departement number (out of a code postal, for instance);
* `Email`: validates the passed e-mail and returns it in lower-case;
* `FirstName`: pass a first name and get a normalized one (it uses an enlarged French dictionay of first names to process it making it possible to pass from `"J.-Louis"` to `"JEAN LOUIS"`);
* `Mobile`: to validate a French mobile phone;
* `PhoneNumber`: to normalize a French phone or fax number in the international format, eg. `+33 (0) 123 456 789`;
* `StreetNumber`: parses the passed field to normalize it the Empreinte Sociométrique&trade;'s way, eg. `1bis` or `1 bis` becomes `1B`;
* `Title`: returns a code depending on the passed string (1 for gentlemen, 2 for ladies, 0 when undefined or unknown).

```typescript
import * as esNormalizer from 'es-normalizer'

const anyStringNormalized = esNormalizer.normalize('#This is any String(). ', esNormalizer.Any)
// THIS IS ANY STRING
console.log(anyStringNormalized.getOrElse(''))

const addressLine1Normalized = esNormalizer.normalize('Monsieur Cyril Dever', esNormalizer.AddressLine(true))
// 1 CYRIL DEVER
console.log(addressLine1Normalized.getOrElse(''))

const addressLine4Normalized = esNormalizer.normalize('24, rué de Maubeuge', esNormalizer.AddressLine())
// 24 RUE MAUBEUGE
console.log(addressLine4Normalized.getOrElse(''))

let addressLine6Normalized = esNormalizer.normalize('75009 .# Paris', esNormalizer.AddressLine6())
// 75009 75 PARIS
console.log(addressLine6Normalized.getOrElse(''))

addressLine6Normalized = esNormalizer.normalize('75009 .# Paris', esNormalizer.AddressLine6(false))
// 75009 PARIS
console.log(addressLine6Normalized.getOrElse(''))

const cityNormalized = esNormalizer.normalize('Paris Cedex 09', esNormalizer.City)
// PARIS
console.log(cityNormalized.getOrElse(''))

const ddnNormalized = esNormalizer.normalize('70/12/01', esNormalizer.DateOfBirth, 'YY/MM/DD', esNormalizer.FRENCH_DATE)
// 01/12/1970
console.log(ddnNormalized.getOrElse(''))

const dptNormalized = esNormalizer.normalize(' 75009 ', esNormalizer.DepartementFrance)
// 75
console.log(dptNormalized.getOrElse(''))

const emailNormalized = esNormalizer.normalize(' Contact@GMAIL.com', esNormalizer.Email)
// contact@gmail.com
console.log(emailNormalized.getOrElse(''))

const firstNameNormalized = esNormalizer.normalize('J.-Michel', esNormalizer.FirstName)
// JEAN MICHEL
console.log(firstNameNormalized.getOrElse(''))

const mobileNormalized = esNormalizer.normalize('06.23.45.67.89', esNormalizer.Mobile)
// +33 (0) 123 456 789
console.log(mobileNormalized.getOrElse(''))

const phoneNormalized = esNormalizer.normalize('0123456789', esNormalizer.PhoneNumber)
// +33 (0) 123 456 789
console.log(phoneNormalized.getOrElse(''))

const streetNumberNormalized = esNormalizer.normalize('1bis', esNormalizer.StreetNumber)
// 1B
console.log(streetNumberNormalized.getOrElse(''))

const titleNormalized = esNormalizer.normalize('Mademoiselle', esNormalizer.Title)
// 2
console.log(titleNormalized.getOrElse(''))
```

##### Dependencies

This library relies on the following dependencies:
* [`moment`](https://www.npmjs.com/package/moment);
* [`ts-utls`](https://www.npmjs.com/package/ts-utls).

Besides, to run the tests, you would need to install [`live-server`](https://www.npmjs.com/package/live-server):
```console
npm i -g live-server
```


### License

This module is distributed under a MIT license. \
See the [LICENSE](LICENSE) file.


<hr />
&copy; 2020-2026 Cyril Dever. All rights reserved.