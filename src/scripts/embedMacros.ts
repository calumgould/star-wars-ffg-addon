import fs from 'fs-extra'
import path from 'path'

const embedMacros = () => {
    const damageCalculatorMacro = {
      _id: 'star-wars-ffg-damage-calculator-macro',
      name: 'Damage Calculator',
      type: 'script',
      scope: 'global',
      img: "modules/star-wars-ffg-addon/assets/calculator.svg",
      command: fs.readFileSync('src/scripts/macros/damageCalculator.js', 'utf8'),
    };

    fs.writeFileSync(
      path.resolve('src/packs/macros-star-wars-ffg.json'),
      JSON.stringify([damageCalculatorMacro], null, 2)
    );
  }

embedMacros();