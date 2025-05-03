let socket: any

Hooks.on('ready', () => {
  console.log('Star Wars FFG addon module loaded')
})

Hooks.once('socketlib.ready', () => {
  socket = socketlib.registerModule('star-wars-ffg-addon');

  // Register a callable function that runs the macro
  socket.register('runDamageCalculatorMacro', async () => {
    const macroName = 'Damage Calculator'
    const compendiumName = 'star-wars-ffg-addon.star-wars-ffg-addon-macros';
    const compendium = game.packs.get(compendiumName);

    if (!compendium) {
      console.error(`Compendium "${compendiumName}" not found`);
      return;
    }

    const documents = await compendium.getDocuments();
    const macro = documents.find((entry: any) => entry.name === macroName);

    if (!macro) {
      console.error(`Macro "${macroName}" not found in compendium`);
      return;
    }

    await macro.execute();
  });

  Hooks.on('createChatMessage', async (message: any) => {
    console.log('Chat message created:', message);

    const attackKeywords = ['RangedHeavy', 'RangedLight', 'Melee', 'Lightsaber', 'Gunnery', 'Brawl']

    if (
      game.user.isGM &&
      attackKeywords.some((keyword) => message.flavor && message.flavor.replace(/[:\s]/g, '').includes(keyword)) &&
      message.rolls.length &&
      message.rolls[0].data.type === 'weapon'
    ) {
      console.log("Chat message is an attack, running the macro")
      await socket.executeAsGM('runDamageCalculatorMacro');
    } else {
      console.log("Chat message is not an attack so there is nothing to do")
    }

  });
});

