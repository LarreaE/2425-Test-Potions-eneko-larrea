import Antidote from "./Antidote.js"
import Elixir from "./Elixir.js"
import Essence from "./Essence.js"
import Poison from "./Poison.js"
import Stench from "./Stench.js"
import Venom from "./Venom.js"
import Cleanse from "./Cleanse.js"
export default class Potion {
  constructor(props) {
    this._id = props._id
    this.description = props.description
    this.image = props.image
    this.type = props.type
    this.name = props.name
    this.value = props.value
    this.modifiers = props.modifiers
  }

  static create(ingredients, curses) {
    let value = calculateValue(ingredients)
    let description
    let image = "assets/animations/potion.gif"
    let type = "Potion"
    let curse = seekCurse(ingredients, curses)
    let modifiers = null
    let duration = 0
    if (curse) {
      modifiers = curse.modifiers
    }

    let id = "id"
    let effectsArray = []

    for (let i = 0; i < ingredients.length; i++) {
      const categorizedEffect = categorizeEffect(ingredients[i].effects[0])
      effectsArray.push(categorizedEffect)
    }
    let lowerPotency = checkIngredientCompatibility(effectsArray)
    description = ingredients[0].description
    if (lowerPotency === "nothing") {
      lowerPotency = ""
    }
    let potion_name = ""

    //same effect
    if (
      effectsArray.every(element => element.effect === effectsArray[0].effect)
    ) {
      if (
        curse === null &&
        (effectsArray[0].effect === "restore" ||
          effectsArray[0].effect === "damage")
      ) {
        potion_name = "Failed Potion"
        type = "Failed Potion"
        value = 1
        description = "A failed potion, do not consume."
        return new Potion({
          _id: id,
          name: potion_name,
          description: description,
          image: image,
          type: type,
          value: value,
          modifiers: modifiers
        })
      } else {
        switch (effectsArray[0].effect) {
          case "increase":
            potion_name = Essence.name(lowerPotency)
            type = "Essence"
            let heal = Essence.calculateMod(effectsArray)
            return new Essence({
              _id: id,
              name: potion_name,
              description: description,
              image: image,
              type: type,
              value: value,
              heal: heal
            })
          case "decrease":
            potion_name = Stench.name(lowerPotency)
            type = "Stench"
            let damage = Stench.calculateMod(effectsArray)
            return new Stench({
              _id: id,
              name: potion_name,
              description: description,
              image: image,
              type: type,
              value: value,
              damage: damage
            })
          case "calm":
            potion_name = `${lowerPotency} ${effectsArray[0].effect} elixir` // calm elixir
            type = "Elixir"
            modifiers = Elixir.calculateMod(effectsArray)
            duration = Elixir.calculateDuration(effectsArray)

            return new Elixir({
              _id: id,
              name: potion_name,
              description: description,
              image: image,
              type: type,
              value: value,
              modifiers: modifiers,
              duration: duration
            })
          case "frenzy":
            potion_name = `${lowerPotency} ${effectsArray[0].effect} venom`
            
            type = "Venom"
            modifiers = Venom.calculateMod(effectsArray)
            duration = Venom.calculateDuration(effectsArray)

            return new Venom({
              _id: id,
              name: potion_name,
              description: description,
              image: image,
              type: type,
              value: value,
              modifiers: modifiers,
              duration: duration
            })
          case "boost":
            potion_name = `${lowerPotency} ${effectsArray[0].attribute} elixir`
            
            type = "Elixir"
            modifiers = Elixir.calculateMod(effectsArray)
            duration = Elixir.calculateDuration(effectsArray)
            return new Elixir({
              _id: id,
              name: potion_name,
              description: description,
              image: image,
              type: type,
              value: value,
              modifiers: modifiers,
              duration: duration
            })
          case "setback":
            potion_name = `${lowerPotency} ${effectsArray[0].attribute} venom`
            
            type = "Venom"
            modifiers = Venom.calculateMod(effectsArray)
            duration = Elixir.calculateDuration(effectsArray)

            return new Venom({
              _id: id,
              name: potion_name,
              description: description,
              image: image,
              type: type,
              value: value,
              modifiers: modifiers,
              duration: duration
            })
          case "restore":
            potion_name = `${lowerPotency} Antidote of ${curse?.name}`
            
            type = "Antidote"

            return new Antidote({
              _id: id,
              name: potion_name,
              description: description,
              image: image,
              type: type,
              value: value,
              modifiers: modifiers
            })
          case "damage":
            potion_name = `${lowerPotency} Poison of ${curse?.name}`
            
            type = "Poison"

            return new Poison({
              _id: id,
              name: potion_name,
              description: description,
              image: image,
              type: type,
              value: value,
              modifiers: modifiers
            })
          //purification potion
          case "cleanse":
            potion_name = Cleanse.name(lowerPotency)
            
            type = "Cleanse"

            return new Cleanse({
              _id: id,
              name: potion_name,
              description: description,
              image: image,
              type: type,
              value: value
            })
          default:
            potion_name = "Failed Potion"
            type = "Failed Potion"
            value = 1
            description = "A failed potion, do not consume."
            return new Potion({
              _id: id,
              name: potion_name,
              description: description,
              image: image,
              type: type,
              value: value,
              modifiers: modifiers
            })
        }
      }
    } else {
      //not same effect (check antidotes-poison)
      if (curse === null) {
        potion_name = "Failed Potion"
        type = "Failed Potion"
        value = 1
        description = "A failed potion, do not consume."
        return new Potion({
          _id: id,
          name: potion_name,
          description: description,
          image: image,
          type: type,
          value: value,
          modifiers: modifiers
        })
      }
    }
  }
}
function calculateValue(ingredients) {
  let value = 0
  for (let i = 0; i < ingredients.length; i++) {
    value += ingredients[i].value
  }
  return value
}

function seekCurse(ingredients, curses) {
  const ingredientEffects = []

  // add ingredients, keeping all effects including duplicates
  ingredients.forEach(ingredient => {
    ingredient.effects.forEach(effect => {
      ingredientEffects.push(effect)
    })
  })

  // check for poison or antidote effects match in curses
  for (let i = 0; i < curses.length; i++) {
    const poisonMatch = effectsMatch(
      curses[i].poison_effects,
      ingredientEffects
    )
    const antidoteMatch = effectsMatch(
      curses[i].antidote_effects,
      ingredientEffects
    )

    if (poisonMatch || antidoteMatch) {
      return curses[i]
    }
  }

  return null // no match
}
// check if all curse effects match ingredient effects
function effectsMatch(curseEffects, ingredientEffects) {
  // check if all curseEffects are included in ingredientEffects, regardless of order
  return curseEffects.every(
    effect =>
      ingredientEffects.includes(effect) &&
      ingredientEffects.filter(e => e === effect).length ===
        curseEffects.filter(e => e === effect).length
  )
}

function categorizeEffect(str) {
  str = str.replace("hit_points", "hitpoints")

  const parts = str.split("_")
  let potency = ""
  let effect = ""
  let attribute = ""

  if (str.includes("calm") || str.includes("frenzy")) {
    if (parts.length === 2) {
      // two parts
      potency = parts[0]
      effect = parts[1]
      attribute = "insanity"
    } else if (parts.length === 1) {
      // no potency
      potency = "nothing"
      effect = parts[0]
      attribute = "insanity"
    } else {
      throw new Error("Invalid string format: " + str)
    }
  } else if (str.includes("unknown")) {
    //rare ingredients
    potency = ""
    effect = "unknown"
    attribute = "unknown"
  } else {
    if (parts.length === 3) {
      // three parts
      potency = parts[0]
      effect = parts[1]
      attribute = parts[2]
    } else if (parts.length === 2) {
      // no potency
      potency = "nothing"
      effect = parts[0]
      attribute = parts[1]
    } else {
      throw new Error("Invalid string format: " + str)
    }
  }
  return { potency, effect, attribute }
}

const potencyTiers = {
  least: 0,
  lesser: 1,
  nothing: 2,
  greater: 3
}

function checkIngredientCompatibility(effects) {
  let lowerPotencyeffect = effects[0]
  for (let i = 0; i < effects.length; i++) {
    for (let j = i + 1; j < effects.length; j++) {
      const effect1 = effects[i]
      const effect2 = effects[j]

      lowerPotencyeffect =
        potencyTiers[effect1.potency] < potencyTiers[effect2.potency]
          ? effect1
          : effect2
    }
  }
  return lowerPotencyeffect.potency
}
