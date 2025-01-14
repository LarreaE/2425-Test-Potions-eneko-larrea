import {createPotion} from '../index.js'
import { falseEssenceMock, falseEssenceMock2, leastEssenceMock, leastEssenceMock3, leastEssenceMock4, mixedEssence, multipleIngredientsEssence } from '../mocks/essences.js'


//ESSENCE

describe('Cuando los efectos llevan asociado "increase"', () => {
    describe('cuando los ingredientes llevan el mismo attributo (HP)', () => {
        describe('Cuando todos los effectos son del mismo tipo(lesser,greater...)', () => {
            describe('cuando el numero de ingredientes es 2', () => {
                it('El valor resultante del atributo sera la suma de values de los ingredientes mas un 20% de bonificacion', () => {
                    //arrange		
                    const selectedIngredients = leastEssenceMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.heal).toBe(12); // suma de values + 20% 5+5=10 , 10*1.2=12 
                })
            })
            describe('cuando el numero de ingredientes es 3', () => {
                it('El valor resultante del atributo sera la suma de values de los ingredientes mas un 40% de bonificacion', () => {
                    //arrange		
                    const selectedIngredients = leastEssenceMock3 // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.heal).toBe(21); // suma de values + 20% 5+5+5=15 , 15*1.4=12 
                })
            })
            describe('cuando el numero de ingredientes es 4', () => {
                it('El valor resultante del atributo sera la suma de values de los ingredientes mas un 40% de bonificacion', () => {
                    //arrange		
                    const selectedIngredients = leastEssenceMock4 // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.heal).toBe(36); // suma de values + 20% 5+5+5+5=20 , 20*1.8=12 
                })
            })
            describe('cuando el numero de ingredientes es mayor que 4 y menor que 2', () => {
                it('la pocion resultará fallida con 5 ingredientes', () => {
                    //arrange		
                    const selectedIngredients = multipleIngredientsEssence // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.name).not.toMatch('Heal'); // no contendra heal en el nombre
                })
            })
            describe('El nombre de la pocion resulara en Essense of + modifier + heal', () => {
                it('El valor resultante del atributo sera la suma de values de los ingredientes mas un 40% de bonificacion', () => {
                    //arrange		
                    const selectedIngredients = leastEssenceMock4 // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.name).toBe('Essence of least heal'); // asumimons que el nombre seŕa essence of least heal
                })
            })
        })
        describe('cuando los effectos son de distinto tipo ( greater, lesser...)', () => {
            it('la pocion resultará fallida con 5 ingredientes', () => {
                //arrange		
                const selectedIngredients = mixedEssence // usamos ingredientes correctos
                //act
                const potion = createPotion(selectedIngredients);                    
                //assert
                expect(potion.heal).toBe(50); // 5+10+15+20 = 50; sin bonificaciones
            })
        })
    })
    describe('cuando los ingredientes hacen referencia a distintos atributos (hp, dexterity)', () => {
        it('FAIL - no podremos creear el elixir, el nombre no contendrá e"ssence"', () => { //fallo. la pocion si se crea
            //arrange		
            const selectedIngredients = falseEssenceMock // usamos ingredientes incorrecots, referencias a charisma y hit_points
            //act
            const potion = createPotion(selectedIngredients);
            //assert
            expect(potion.name).not.toMatch('Essence'); //no coincidiran
        })
    })
})

describe('Cuando alguno de los efectos no es "increase"', () => {
        it('no podremos creear el elixir, el nombre no contendrá "essence"', () => {
            //arrange		
            const selectedIngredients = falseEssenceMock2 // usamos ingredientes incorrecots, referencias a charisma y hit_points
            //act
            const potion = createPotion(selectedIngredients);
            //assert
            expect(potion.name).not.toMatch('Essence'); //no coincidiran
        })
})
