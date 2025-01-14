import  { antidoteMock ,gravechillMock, falseAntidoteMock, poisonMock, falsePoisonMock, leastElixiMock, lesserElixirMock, voidElixirMock, greaterElixirMock, mixedElixirMock, falseAttrElixirMock, leastCalmMock, lesserCalmMock, voidCalmMock, greaterCalmMock, mixedCalmMock, falseAttrCalmMock, singleIngredient, multipleIngredients} from '../mocks/individual.js'
import {createPotion} from '../index.js'


//FAILED POTION
describe('Cuando las condiciones no se cumplen, la pocion creada tendra el nombr Tonic of Downfall' , () => {
    it('El nombre deberá ser correspondiente. Tonic of Downfall', () => {
        //arrange		
        const selectedIngredients = falseAntidoteMock  //usamos los ingredientes apropiados para crear gravechill
        //act
        const potion = createPotion(selectedIngredients);
        
        //assert
        expect(potion.name).toBe('Tonic of Downfall');
    })
})


