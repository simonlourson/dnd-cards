export const abilities: string[] = [
  'Force',
  'Dextérité',
  'Constitution',
  'Intelligence',
  'Sagesse',
  'Charisme'
]

export const skills: string[] = [
  'Acrobaties',
  'Arcanes',
  'Athlétisme',
  'Discrétion',
  'Dressage',
  'Escamotage',
  'Histoire',
  'Intimidation',
  'Intuition',
  'Investigation',
  'Médecine',
  'Nature',
  'Perception',
  'Persuasion',
  'Religion',
  'Représentation',
  'Survie',
  'Tromperie',
]

export const skillsAbilitiesMapping: number[] = [
  1,
  3,
  0,
  1,
  4,
  1,
  3,
  5,
  4,
  3,
  4,
  3,
  4,
  5,
  3,
  5,
  4,
  5,
]

/*
100: Acrobatics
101: Animal Handling
102: Arcana
103: Athletics
104: Deception
105: History
106: Insight
107: Intimidation
108: Investigation
109: Medicine
110: Nature
111: Perception
112: Performance
113: Persuasion
114: Religion
115: Sleight of Hand
116: Stealth
117: Survival
*/

interface Weapon {
  name: string
  properties: number
}

interface Attack {
  name: string
  attackBonus: number
  damage: string
}

interface Spell {
  level: number
  name: string
  school: number
  time: string
  range: string
  verbal: boolean
  somatic: boolean
  material: boolean
  materials: string
  duration: string
  concentration: boolean
  text: string
}

const damageTypes: string[] = [
  'Any',
  'Bludgeoning',
  'Piercing',
  'Slashing',
  'Acid',
  'Cold',
  'Fire',
  'Force',
  'Lightning',
  'Necrotic',
  'Poison',
  'Psychic',
  'Radiant',
  'Thunder'
]


enum WeaponProperty {
  Ammunition = 1,
  Finesse = 2,
  Heavy = 4,
  Light = 8,
  Loading = 16,
  Reach = 32,
  Special = 64,
  Thrown = 128,
  TwoHanded = 256,
  Versatile = 512,
  Martial = 1024
}

/*
Mod Categories
4 : Double skill proficiency
*/

export function hitDiceType(className: string): string {
  switch (className) {
    case 'Sorcerer':
    case 'Wizard':
      return 'image_d6'
    case 'Artificer':
    case 'Bard':
    case 'Cleric':
    case 'Druid':
    case 'Monk':
    case 'Rogue':
    case 'Warlock': 
      return 'image_d8'
    case'Fighter':
    case 'Paladin':
    case 'Ranger':
      return 'image_d10'
    case 'Barbarian':
      return 'image_d12'
  }
  return 'image_d6'
}

export const skillIndexTranslation: number[] = [
  0,  // Acrobatics - Acrobaties
  4,  // Animal Handling - Dressage
  1,  // Arcana - Arcanes
  2,  // Athletics - Athlétisme
  17, // Deception - Tromperie
  6,  // History - Histoire
  8,  // Insight - Intuition
  7,  // Intimidation - Intimidation
  9,  // Investigation - Investigation
  10, // Medicine - Médecine
  11, // Nature - Nature
  12, // Perception - Perception
  15, // Performance - Représentation
  13, // Persuasion - Persuasion
  14, // Religion - Religion
  5,  // Sleight of Hand - Escamotage
  3,  // Stealth - Discrétion
  16, // Survival - Survie
]

interface Counter {
  name: string
  max: number
  color: string
}

export interface CharacterSheet {
  name: string
  feats: Feat[]
  page2Feats: Feat[]
  abilityScores: number[]
  className: string
  race: string
  background: string
  level: number
  hpMax: number
  proficiencyBonus: number
  savingThrowProficiencies: boolean[]
  savingThrowBonuses: number[]
  skillProficiencies: boolean[]
  skillBonuses: number[]
  armorClass: number
  initiative: number
  attacks: Attack[]
  counters: Counter[]
  spellAbility: number
  spellSlots: number[]
  spells: Spell[][]
  spellsPerDay: number
  spellsDd: number
  spellAttackBonus: number
}

export function scoreToModifier(abilityScore: number): number {
  return Math.floor((abilityScore - 10) / 2)
}

export const modifierFormat = new Intl.NumberFormat("en-US", { signDisplay: "exceptZero" })
export function scoreToModifierString(abilityScore: number): string {
  return modifierFormat.format(scoreToModifier(abilityScore))
}

function doesWeaponHaveProperty(weapon: Weapon, weaponProperty: WeaponProperty) {
  return (weapon.properties & weaponProperty) == weaponProperty
}

function counterFromNode(xmlData: any): Counter {

  const resetType = xmlData.resetType ? Number.parseInt(xmlData.resetType._text) : 0
  let color: string = '#fff'

  return {
    name: xmlData.label._text,
    max: Number.parseInt(xmlData.value._text),
    color: color
  }
}

export function extractCharacterSheetFromXmlData(xmlData: any): CharacterSheet {

  const name = xmlData?.pc.character.name._text

  const feats: Feat[] = []
  findFeats(xmlData, feats)

  const className = xmlData?.pc.character.class.name._text
  const race = xmlData?.pc.character.race.name._text
  const level = Number.parseInt(xmlData?.pc.character.class.level._text)
  const proficiencyBonus = 1 + Math.ceil(level / 4)

  const spellAbility = Number.parseInt(xmlData?.pc.character.class.spellAbility._text)
  const spellSlots = xmlData?.pc.character.slots._text.split(',').slice(0, 10).map(function(s: string) { return parseInt(s) })
  const spells: Spell[][] = []
  
  if (xmlData?.pc.character.class.spell?.length)
    for (let xmlNode of xmlData?.pc.character.class.spell) {
      const spell: Spell = {
        level: xmlNode.level ? Number.parseInt(xmlNode.level._text) : 0,
        name: xmlNode.name._text,
        school: xmlNode.school ? Number.parseInt(xmlNode.school._text) : 0,
        time: xmlNode.time._text,
        range: xmlNode.range._text,
        verbal: xmlNode.v ? true : false,
        somatic: xmlNode.s ? true : false,
        material: xmlNode.m ? true : false,
        materials: xmlNode.materials ? xmlNode.materials._text : undefined,
        duration: xmlNode.duration._text,
        concentration: (xmlNode.duration._text as string).includes('Concentration'),
        text: xmlNode.text._text
      }

      if (!spells[spell.level]) spells[spell.level] = []
      spells[spell.level].push(spell)
    }

  const abilityScores: number[] = xmlData?.pc.character.abilities._text.split(',').map(function(s: string) { return parseInt(s) }).slice(0, 6)
  const savingThrowProficiencies: boolean[] = []
  const savingThrowBonuses: number[] = []

  

  const background = xmlData?.pc.character.background.name._text
  
  const hpMax = Number.parseInt(xmlData?.pc.character.hpMax._text)
  

  const mods: Mod[] = []
  findMods(xmlData, mods)
  
  for (let mod of mods) {
    if (mod.category == 1) abilityScores[mod.type] += mod.value
  }

  const spellsDd = 8 + proficiencyBonus + scoreToModifier(abilityScores[spellAbility])
  const spellAttackBonus = proficiencyBonus + scoreToModifier(abilityScores[spellAbility])
  let spellsPerDay = 0
  if (className == 'Wizard') spellsPerDay = level + scoreToModifier(abilityScores[spellAbility])

  const proficiencies: number[] = []
  findProficiencies(xmlData, proficiencies)

  const skillProficiencies: boolean[] = []
  const skillBonuses: number[] = []
  for (let skillIndex = 0; skillIndex < skills.length; skillIndex++) {
    skillProficiencies[skillIndex] = false
  }

  for (let abilityIndex = 0; abilityIndex < abilities.length; abilityIndex++) {
    savingThrowProficiencies[abilityIndex] = false
  }

  for (let proficiency of proficiencies) {
    if (proficiency >= 0 && proficiency < abilities.length) savingThrowProficiencies[proficiency] = true
    else if (proficiency >= 100 && proficiency < 100 + skills.length) skillProficiencies[skillIndexTranslation[proficiency - 100]] = true
  }

  for (let abilityIndex = 0; abilityIndex < abilities.length; abilityIndex++) {
    savingThrowBonuses[abilityIndex] = scoreToModifier(abilityScores[abilityIndex]) + (savingThrowProficiencies[abilityIndex] ? proficiencyBonus : 0)
  }

  for (let skillIndex = 0; skillIndex < skills.length; skillIndex++) {
    skillBonuses[skillIndex] = scoreToModifier(abilityScores[skillsAbilitiesMapping[skillIndex]]) + (skillProficiencies[skillIndex] ? proficiencyBonus : 0)
  }

  for (let mod of mods) {
    if (mod.category == 4) skillBonuses[skillIndexTranslation[mod.type]] += proficiencyBonus
  }

  const counters: Counter[] = []
  if (xmlData?.pc.character.tracker) {
    if (xmlData?.pc.character.tracker.length > 0) {
      for (let tracker of xmlData?.pc.character.tracker)
        counters.push(counterFromNode(tracker))
    }
    else {
      counters.push(counterFromNode(xmlData?.pc.character.tracker))
    }
  }

  let armorClass = 10 + scoreToModifier(abilityScores[1])
  for (let mod of mods) {
    if (mod.category == 0 && mod.type == 10) armorClass += mod.value
  }


  const attacks: Attack[] = []
  const weapons: Weapon[] = []
  if (xmlData?.pc.character.item?.length > 0)
    for (let item of xmlData?.pc.character.item) {
      const name = item.name ? item.name._text : 'Unknown'
      const weaponProperty = item.weaponProperty ? Number.parseInt(item.weaponProperty._text) : 0
      const type = item.type ? Number.parseInt(item.type._text) : -1
      const slot = item.slot ? Number.parseInt(item.slot._text) : -1
      const ac = item.ac ? Number.parseInt(item.ac._text) : -1

      if (type == 1 && slot == 5 && ac > 0) armorClass = ac + scoreToModifier(abilityScores[1])
      if (type == 5 || type == 6) {
        const weapon: Weapon = {
          name: name,
          properties: weaponProperty
        }
        
        const damage1h: string = item.damage1H?._text
        const damage2h: string = item.damage2H?._text
        const damageType: string = damageTypes[item.damageType ? Number.parseInt(item.damageType._text) : 0]
        const damageBonus = type == 6 ? scoreToModifier(abilityScores[1]) : doesWeaponHaveProperty(weapon, WeaponProperty.Finesse) ? 
          Math.max(scoreToModifier(abilityScores[0]), scoreToModifier(abilityScores[1])) : 
          scoreToModifier(abilityScores[0])
        let attackBonus = proficiencyBonus + damageBonus

        for (let mod of mods) {
          if (mod.category == 0 && mod.type == 5 && type == 6) attackBonus += mod.value
        }

        if (damage1h) attacks.push({
          name: weapon.name,
          attackBonus: attackBonus,
          damage: `${damage2h ? 'Une Main<br>' : ''}${damage1h}${modifierFormat.format(damageBonus)} (${damageType})`
        })

        if (damage2h) attacks.push({
          name: weapon.name,
          attackBonus: attackBonus,
          damage: `${damage1h ? 'Deux Mains<br>' : ''}${damage2h}${modifierFormat.format(damageBonus)} (${damageType})`
        })
      }
    }

  


  return {
    name: name,
    feats: feats,
    page2Feats: [],
    abilityScores: abilityScores,
    spellAbility: spellAbility,
    spells: spells,
    spellSlots: spellSlots,
    spellsPerDay: spellsPerDay,
    spellsDd: spellsDd,
    spellAttackBonus: spellAttackBonus,
    className: className,
    race: race,
    background: background,
    level: level,
    hpMax: hpMax,
    counters: counters,
    proficiencyBonus: proficiencyBonus,
    savingThrowProficiencies: savingThrowProficiencies,
    savingThrowBonuses: savingThrowBonuses,
    skillProficiencies: skillProficiencies,
    skillBonuses: skillBonuses,
    armorClass: armorClass,
    initiative: scoreToModifier(abilityScores[1]),
    attacks: attacks
  }
}

export interface Feat {
  name: string
  text: string
}

export interface Mod {
  category: number
  type: number
  value: number
}

export const bonus: number[] = [-5, -5, -4, -4, -3, -3, -2, -2, -1, -1, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10]

export function findProficiencies(xmlData: any, proficiencies: number[]) {
  for (var prop in xmlData) {
    const type = xmlData[prop].constructor.name
    if (prop == 'proficiency') {
      if (type == 'Object') proficiencies.push(parseInt(xmlData[prop]._text))
      else if (type == 'Array') for (var proficiency of xmlData[prop]) proficiencies.push(parseInt(proficiency._text))
    }
    else if (type != 'String') findProficiencies(xmlData[prop], proficiencies)
  }
}

function replaceRulesText(text: string): string {
  return text
    .replaceAll('\n', '<br>')
    .replaceAll('short or long rest', '<span style="background-color:burlywood">short or long rest</span>')
    .replaceAll(/(?<!short or )long rest/g, '<span style="background-color:deepskyblue">long rest</span>')
    .replaceAll('reaction', '<span style="background-color:darksalmon">reaction</span>')
    .replaceAll('bonus action', '<span style="background-color:palegreen">bonus action</span>')
    .replaceAll(/(?<!bonus |re)action/g, '<span style="background-color:pink">action</span>')
    .replace(/Source:.*/, '')
}

export function findFeats(xmlData: any, feats: Feat[]) {
  for (var prop in xmlData) {
    const type = xmlData[prop].constructor.name
    if (prop == 'feat') {
      if (type == 'Object') feats.push({name: xmlData[prop].name._text.replace('Feature: ', ''), text: replaceRulesText(xmlData[prop].text._text)})
      else if (type == 'Array') for (var feat of xmlData[prop]) feats.push({name: feat.name._text.replace('Feature: ', ''), text: replaceRulesText(feat.text._text)})
    }
    else if (type != 'String' && prop != 'autolevel') findFeats(xmlData[prop], feats)
  }
}

function modFromNode(xmlNode: any): Mod {
  const category = xmlNode.category?._text
  const type = xmlNode.type?._text
  const value = xmlNode.value?._text

  return {
    category: category ? Number.parseInt(category) : 0,
    type: type ? Number.parseInt(type) : 0,
    value: value ? Number.parseInt(value) : 0
  }
}

function findMods(xmlData: any, mods: Mod[]) {
  for (var prop in xmlData) {
    const type = xmlData[prop].constructor.name
    if (prop == 'mod') {
      if (type == 'Object') mods.push(modFromNode(xmlData[prop]))
      else if (type == 'Array') for (var mod of xmlData[prop]) mods.push(modFromNode(mod))
    }
    else if (type != 'String') findMods(xmlData[prop], mods)
  }
} 