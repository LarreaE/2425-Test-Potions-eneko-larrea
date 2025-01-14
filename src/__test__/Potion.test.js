import Potion from '../Potions/Potion.js'
import  { antidoteMock ,gravechillMock, falseAntidoteMock} from '../mocks/individual.js'
import curses from '../mocks/curses.json'
import {createPotion} from '../index.js'

describe('Cuando todos los ingredientes llevan effecto "restore"', () => {
	it('El nombre deberá ser correspondiente. Antidote of + "nombre enfermedad"', () => {
        //arrange		
        const selectedIngredients = antidoteMock  //usamos los ingredientes apropiados para crear gravechill
        //act
		const potion = createPotion(selectedIngredients);
		
        //assert
		expect(potion.name).toBe('lesser Antidote of Gravechill');
	})
    it('Los atributos tendran el mismo valor que el de la enfermedad relacionada, pero cambiando de signo', () => {
        //arrange		
        const selectedIngredients = antidoteMock
        const disease = gravechillMock //cogemos la enfermedad
        //act
		const potion = createPotion(selectedIngredients);
		console.log(potion);
		console.log(disease.modifiers);
        
        //assert
		expect(potion.modifiers).toStrictEqual(disease.modifiers);
	})
})

describe('Si alguno de los ingredientes no lleva el effecto "restore"', () => {
    it('No podremos crear un antidoto, El nombre de la pocion creada no llevara el "Antidote"', () => {
        //arrange		
        const selectedIngredients = falseAntidoteMock // usamos ingredientes incorrectos
        //act
		const potion = createPotion(selectedIngredients);
        
        //assert
        expect(potion.name).not.toMatch('Antidote');
	})
})