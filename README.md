# Star Wars FFG Addon Module

This is an addon module for the Star Wars FFG system, which can be found here https://github.com/StarWarsFoundryVTT/StarWarsFFG

## Installation

Enter this as the "Manifest URL" when installing modules on Foundry:
https://github.com/calumgould/star-wars-ffg-addon/releases/latest/download/module.json

If you just want the macro to copy and paste into your game you get find it here -> [damageCalculator.js](src/scripts/macros/damageCalculator.js)

## Current Features

TODO

## Creating a new release

Update the version in `package.json` and `module.json`
First run
```shell
npm run build
```

Then bundling the macro itself takes a bit more work.

1. Create a macro in foundry, ideally on a fresh world so it's the only macro there
2. Quit Foundry
3. Navigate to where the macros are stored, e.g. `C:\Users\YourName\AppData\Local\FoundryVTT\Data\worlds\world-name\data\macros`
4. Copy everything here except the log file to the `packs/star-wars-ffg-addon`
5. Commit those changes and you're ready to make a release!

Go to [Releases](https://github.com/calumgould/star-wars-ffg-addon/releases) and create a new release.

The github workflow should take care of the rest and add the final bundle files to the release once it completes.
