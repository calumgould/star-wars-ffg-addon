Hooks.on('ready', () => {
  console.log('Star Wars FFG addon module loaded')
})

Hooks.on('createChatMessage', async (message: any) => {
  console.log('Chat message created:', message)

  const macroName = 'Damage Calculator'
  const compendiumName = 'star-wars-ffg-addon.star-wars-ffg-addon-macros'

  const compendium = game.packs.get(compendiumName)

  if (compendium) {
    const documents = await compendium.getDocuments()
    console.log('Compendium documents:', documents)
    const macro = documents.find((entry: any) => entry.name === macroName)
    console.log('Macro found:', macro)

    if (macro) {
      console.log('Executing macro:', macro)
      await macro.execute()
    } else {
      console.error(`Macro "${macroName}" not found in compendium "${compendiumName}"`)
    }
  }
})