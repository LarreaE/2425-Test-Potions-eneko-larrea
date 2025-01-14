import  { antidoteMock ,gravechillMock, falseAntidoteMock, poisonMock, falsePoisonMock, leastElixiMock, lesserElixirMock, voidElixirMock, greaterElixirMock, mixedElixirMock, falseAttrElixirMock, leastCalmMock, lesserCalmMock, voidCalmMock, greaterCalmMock, mixedCalmMock, falseAttrCalmMock, singleIngredient, multipleIngredients} from '../mocks/individual.js'
import {createPotion} from '../index.js'


//ANTIDOTE
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

//POISON
describe('Cuando todos los ingredientes llevan effecto "damage"', () => {
	it('Si los ingredientes contienten los efectos necesarios para combatir una enfermedad concreta. Poison of + "nombre enfermedad"', () => {
        //arrange		
        const selectedIngredients = poisonMock  //usamos los ingredientes apropiados para crear gravechill
        //act
		const potion = createPotion(selectedIngredients);
		
        //assert
		expect(potion.name).toBe('lesser Poison of Gravechill');
	})
    it('Los atributos tendran el mismo valor que el de la enfermedad relacionada', () => {
        //arrange		
        const selectedIngredients = poisonMock
        const disease = gravechillMock //cogemos la enfermedad
        //act
		const potion = createPotion(selectedIngredients);
        
        //assert
		expect(potion.modifiers).toStrictEqual(disease.modifiers);
	})
})

describe('Si alguno de los ingredientes no lleva el effecto "damage"', () => {
    it('No podremos crear un Posion, El nombre de la pocion creada no llevara el "Posion"', () => {
        //arrange		
        const selectedIngredients = falsePoisonMock // usamos ingredientes incorrectos
        //act
		const potion = createPotion(selectedIngredients);
        
        //assert
        expect(potion.name).not.toMatch('Poison');
	})
})


