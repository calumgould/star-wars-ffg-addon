Hooks.on('ready', () => {
  console.log('Star Wars FFG addon module loaded')
})

Hooks.once("socketlib.ready", () => {
  socketlib.registerModule("star-wars-ffg-addon");
  socketlib.register("executeMacro", executeMacro);
});

async function executeMacro(macroName: string) {
  const macro = game.macros.getName(macroName);

  if (macro) {
    // Executes the macro on the GM's client
    await macro.execute();
    console.log(`Macro "${macroName}" executed successfully on GM's side.`);
  } else {
    console.error(`Macro "${macroName}" not found.`);
  }
}
