# Star Wars FFG Addon Module

This is an addon module for the Star Wars FFG system, which can be found here https://github.com/StarWarsFoundryVTT/StarWarsFFG

## Installation

Enter this as the "Manifest URL" when installing modules on Foundry:
https://github.com/calumgould/star-wars-ffg-addon/releases/latest/download/module.json

If you just want the macro to copy and paste into your game you get find it here -> [damageCalculator.js](src/scripts/macros/damageCalculator.js)

## Current Features

### Damage Calculator

Macro that reads the latest attack from the chat messages and calculates the damage applied to the targeted token from the character who made the attack.

This macro is auto-triggered when an attack roll is made.

#### Features

Currently this only handles basic attacks and vehicle damage is not handled.

So far the logic covers the basics, plus:
- Pierce
- Breach
- Strain damage

## Development

### Local Development

In order to test this without needing to create a new release everytime you'd need to test changes to this module on Foundry, you can create a symlink to the `dist` folder in your Foundry modules.

#### Windows

Open PowerShell as an admin and run:
```shell
New-Item -ItemType SymbolicLink -Target "$(pwd)\dist" -Path "$env:LOCALAPPDATA\FoundryVTT\Data\modules\star-wars-ffg-addon"
```

#### MacOS

Open your preferred Terminal client and run:
```
ln -s $PWD/dist $HOME/Library/Application\ Support/FoundryVTT/Data/modules/star-wars-ffg-addon
```

Once this is done, the module should show up in your Foundry client and reflect the code you have locally.

To test any changes you make now, follow the below steps:
1. Close Foundry
2. Run `yarn build:dev` (this will also embed macros as well as running the normal build)
3. Re-open Foundry

Now the module should have updated for your local changes.

### Creating a new release

Update the version in `package.json` and `module.json`

Commit your latest changes, this will automatically generate the `.json` file for the macros.

Go to [Releases](https://github.com/calumgould/star-wars-ffg-addon/releases) and create a new release.

The github workflow should take care of the rest and add the final bundle files to the release once it completes.
