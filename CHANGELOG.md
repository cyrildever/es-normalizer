# CHANGELOG.md

## 2.2.2 (2023-03-23)

Features:

  - Now compiles with TypeScript `5.0` and higher.


## 2.2.0 (2022-12-08)

Features:

  - Remove `monet` from dependencies to enable TypeScript versions higher than `4.7`.
  - The monads were replaced by the ones from the `ts-utls` library.


## 2.1.7 (2022-11-28)

Features:

  - `moment` and `ts-utls` become actual dependencies.
  - This should be the last version using the latter because it forces us to keep TypeScript version at `~4.7`.


## 2.1.0 (2022-02-27)

Features:

  - Implement `AddressLine6` normalizer to mimic Empreinte Sociométrique's behaviour adding the DepartmentFrance in between the CodePostalFrance and the city in the French address line 6.


## 2.0.0 (2022-01-25)

Features:

  - **Breaking change:** `AddressLine` normalizer now has a parameter, so it must be used as a function, eg. `esNormalizer.normalize(data, esNormalizer.AddressLine())` (instead of previously: `esNormalizer.normalize(data, esNormalizer.AddressLine)`). \
  This parameter is set to `false` by default which doesn't change the previous behaviour. \
  When setting it to `true`, it tries and normalizes any French title present in the line like with the `Title` normalizer (eg. `Monsieur` -> 1 or `Mme` -> 2). \
  It should only be used in case of French address line 1, ie. with a line made up of title, first and last names.


## 1.1.0 (2020-06-08)

Features:

  - Original production version.


<hr />
&copy; 2020-2023 Cyril Dever. All rights reserved.