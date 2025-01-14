class Ingredient {
    constructor(_id, name, effects, value, type, image, description) {
      this._id = _id
      this.name = name
      this.effects = effects
      this.type = type
      this.image = image
      this.description = description
      this.value = value
    }
  
    static from(ingredient) {
      return new Ingredient(
        ingredient._id,
        ingredient.name,
        ingredient.effects,
        ingredient.value,
        ingredient.type,
        ingredient.image,
        ingredient.description
      )
    }
  
    hasName(name) {
      return this.name === name
    }
  }
  
  export default Ingredient
  