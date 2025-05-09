const getLastAttackFromChat = () => {
  const attackKeywords = ['RangedHeavy', 'RangedLight', 'Melee', 'Lightsaber', 'Gunnery', 'Brawl']

  const chatMessages = game.messages.contents.reverse()

  const lastAttackMessage = chatMessages.find(
    (message) =>
      attackKeywords.some((keyword) => message.flavor.replace(/[:\s]/g, '').includes(keyword)) && message.rolls.length && message.rolls[0].data.type === 'weapon'
  )

  const attackerActorId = lastAttackMessage.speaker.actor

  const attacker = game.actors.get(attackerActorId)

  return { lastAttackMessage, attacker }
}

const getActorStats = (actor) => ({
  soak: actor.system.stats.soak.value,
  wounds: actor.system.stats.wounds.value,
  maxWounds: actor.system.stats.wounds.max,
  strain: actor.system.stats.strain.value,
  maxStrain: actor.system.stats.strain.max,
})

const getWeaponModifiers = (weapon) => {
  const pierce = weapon.system.itemmodifier.find((modifier) => modifier.name.toLowerCase().includes('pierce'))
  const breach = weapon.system.itemmodifier.find((modifier) => modifier.name.toLowerCase().includes('breach'))
  const stun = weapon.system.itemmodifier.find((modifier) => modifier.name.toLowerCase().includes('stun damage'))

  return {
    pierce: pierce ? pierce.system.rank : 0,
    breach: breach ? breach.system.rank * 10 : 0,
    strainDamage: !!stun,
  }
}

const calculateDamage = async () => {
  const { lastAttackMessage, attacker } = getLastAttackFromChat()

  if (!attacker) {
    ui.notifications.error('No attacker token found.')
    return
  }

  const targets = lastAttackMessage.user.targets

  if (!targets.size) {
    ui.notifications.info('No tokens targeted.')
    return
  }

  const attackerName = attacker.name
  const target = await canvas.tokens.get(targets.ids[0])

  const success = lastAttackMessage.rolls[0].ffg.success

  if (!success) {
    await ChatMessage.create({
      user: game.user._id,
      speaker: ChatMessage.getSpeaker(),
      content: `${attackerName} misses ${target.name}.`,
    })
    return
  }

  const targetStats = getActorStats(target.actor)

  const weapon = lastAttackMessage.rolls[0].data
  const weaponModifiers = getWeaponModifiers(weapon)

  const soakAfterModifiers = targetStats.soak - (weaponModifiers.pierce + weaponModifiers.breach)
  const remainingSoak = soakAfterModifiers < 0 ? 0 : soakAfterModifiers

  const baseDamage = weapon.system.damage.adjusted || weapon.system.damage.value
  const extraDamage = success
  const totalDamage = baseDamage + extraDamage
  const damageAfterSoak = totalDamage - remainingSoak

  const damageType = weaponModifiers.strainDamage ? 'strain' : 'wounds'
  const currentStat = damageType === 'strain' ? targetStats.strain : targetStats.wounds
  const maxStat = damageType === 'strain' ? targetStats.maxStrain : targetStats.maxWounds

  if (damageAfterSoak > 0) {
    await target.actor.update({ [`system.stats.${damageType}.value`]: currentStat + damageAfterSoak })
  }

  let chatMessage = `${attackerName} hits ${target.name} with ${weapon.name} for ${totalDamage} ${damageType === 'strain' ? 'strain' : ''} damage.`

  if (currentStat + damageAfterSoak > maxStat) {
    chatMessage += ` ${target.name} is down!`
  }

  await ChatMessage.create({
    user: game.user._id,
    speaker: ChatMessage.getSpeaker(),
    content: chatMessage,
  })
}

calculateDamage()
