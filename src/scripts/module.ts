import { calculateDamage } from 'macros/damageCalculatorExport'

Hooks.on('ready', () => {
  console.log('Star Wars FFG addon module loaded')
})

Hooks.on('createChatMessage', (message: any) => {
  console.log('Chat message created:', message)

  calculateDamage()
})