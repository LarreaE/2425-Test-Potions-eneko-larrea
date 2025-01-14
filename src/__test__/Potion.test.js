import Potion from '../Potions/Potion.js'
import  { antidoteMock } from '../mocks/ingredients.js'
import curses from '../mocks/curses.json'
import {createPotion} from '../index.js'

describe('Cuando todos los ingredientes llevan effecto "restore"', () => {
	it('El nombre deberá ser correspondiente. Antidote of + "nombre enfermedad"', () => {
        //arrange		
        const selectedIngredients = antidoteMock  //usamos los ingredientes apropiados para crear gravechill
        //act
		const potion = createPotion(selectedIngredients);
		console.log(potion);
		
        //assert
		expect(potion.name).toBe('lesser Antidote of Gravechill');
	})
    it('El nombre deberá ser correspondiente. Antidote of + "nombre enfermedad"', () => {
        //arrange		
        const selectedIngredients = antidoteMock
        //act
		const potion = createPotion(selectedIngredients);
		console.log(potion);
		
        //assert
		expect(potion.name).toBe('lesser Antidote of Gravechill');
	})
})