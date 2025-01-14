import {createPotion} from '../index.js'
import { falseStenchMock, falseStenchMock2, leastStenchMock, leastStenchMock3, leastStenchMock4, mixedStenchMock, multipleIngredientsStench } from '../mocks/stenches.js'

//STENCH

describe('Cuando los efectos llevan asociado "decrease"', () => {
    describe('cuando los ingredientes llevan el mismo attributo (HP)', () => {
        describe('Cuando todos los effectos son del mismo tipo(lesser,greater...)', () => {
            describe('cuando el numero de ingredientes es 2', () => {
                it('El valor resultante del atributo sera la suma de values de los ingredientes mas un 20% de bonificacion', () => {
                    //arrange		
                    const selectedIngredients = leastStenchMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.damage).toBe(-12); // suma de values + 20% 5+5=10 , 10*1.2=12 negativo por damage
                })
            })
            describe('cuando el numero de ingredientes es 3', () => {
                it('El valor resultante del atributo sera la suma de values de los ingredientes mas un 40% de bonificacion', () => {
                    //arrange		
                    const selectedIngredients = leastStenchMock3 // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.damage).toBe(-21); // suma de values + 20% 5+5+5=15 , 15*1.4=12 negativo por damage
                })
            })
            describe('cuando el numero de ingredientes es 4', () => {
                it('El valor resultante del atributo sera la suma de values de los ingredientes mas un 40% de bonificacion', () => {
                    //arrange		
                    const selectedIngredients = leastStenchMock4 // usamos ingredientes correctos 
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.damage).toBe(-36); // suma de values + 20% 5+5+5+5=20 , 20*1.8=12 negativo por damage
                })
            })
            describe('cuando el numero de ingredientes es mayor que 4 y menor que 2', () => {
                it('la pocion resultará fallida con 5 ingredientes', () => {
                    //arrange		
                    const selectedIngredients = multipleIngredientsStench // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.name).not.toMatch('Damage'); // no contendra heal en el nombre
                })
            })
            describe('El nombre de la pocion resulara en Essense of + modifier + damage', () => {
                it('El valor resultante del atributo sera la suma de values de los ingredientes mas un 40% de bonificacion', () => {
                    //arrange		
                    const selectedIngredients = leastStenchMock4 // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.name).toBe('Stench of least damage'); // asumimons que el nombre seŕa essence of least heal
                })
            })
        })
        describe('cuando los effectos son de distinto tipo ( greater, lesser...)', () => {
            it('la pocion resultará fallida con 5 ingredientes', () => {
                //arrange		
                const selectedIngredients = mixedStenchMock // usamos ingredientes correctos
                //act
                const potion = createPotion(selectedIngredients);                    
                //assert
                expect(potion.damage).toBe(-50); // 5+10+15+20 = 50; sin bonificaciones negativo por damage
            })
        })
    })
    describe('cuando los ingredientes hacen referencia a distintos atributos (hp, dexterity)', () => {
        it('FAIL - no podremos creear el stench, el nombre no contendrá stench"', () => { //fallo. la pocion si se crea
            //arrange		
            const selectedIngredients = falseStenchMock // usamos ingredientes incorrecots, referencias a charisma y hit_points
            //act
            const potion = createPotion(selectedIngredients);
            //assert
            expect(potion.name).not.toMatch('Stench'); //no coincidiran
        })
    })
})

describe('Cuando alguno de los efectos no es "decrease"', () => {
        it('no podremos creear el stench, el nombre no contendrá "stench"', () => {
            //arrange		
            const selectedIngredients = falseStenchMock2 // usamos ingredientes incorrecots, increase y decrease aplicados
            //act
            const potion = createPotion(selectedIngredients);
            //assert
            expect(potion.name).not.toMatch('Stench'); //no coincidiran
        })
})
