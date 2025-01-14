import  { falseAttrFrenzyMock, falseAttrVenomMock, greaterFrenzyMock, greaterVenomMock, leastFrenzyMock, leastVenomMock, lesserFrenzyMock, lesserVenomMock, mixedFrenzyMock, mixedVenomMock, multipleIngredients, multipleIngredientsVenom, singleIngredient, singleIngredientVenom, voidFrenzyMock, voidVenomMock } from '../mocks/individual.js'
import {createPotion} from '../index.js'


//ESSENCE

describe('Cuando el numeo de ingredientes es 2-4', () => {
    describe('cuando los efectos en los ingredientes llevan "setback"', () => {
        describe('Cuando todos los ingredientes tienen el mismo atributo (DEX,INT...)', () => {
            describe('cuando todos los efectos son tipo least', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = leastVenomMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.charisma).toBe(5); //los ingredientes escogidos afectan a la charisma, la media de los dos ingreds (5-5) least redondeada al multiplo de 5 inferior(5) 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = leastVenomMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(1); //media de duraciones de los ingreds least son (1-1) redondeada para abajo = 1  
                })
            })
            describe('cuando todos los efectos son tipo lesser', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = lesserVenomMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.dexterity).toBe(10); //los ingredientes escogidos afectan al dexterity, la media de los dos ingreds (10-10) lesser redondeada al multiplo de 5 inferior = 10 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = lesserVenomMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(1); //media de duraciones de los ingreds lesser son (1-1) redondeada para abajo = 1  
                })
            })
            describe('cuando todos los efectos son tipo normal ("")', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = voidVenomMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.charisma).toBe(15); //los ingredientes escogidos afectan al charisma, la media de los dos ingreds (15-15) normales redondeada al multiplo de 5 inferior = 15 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = voidVenomMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(2); //media de duraciones de los ingreds normales son (2-2) redondeada para abajo = 2  
                })
            })
            describe('cuando todos los efectos son tipo greater', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = greaterVenomMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.dexterity).toBe(20); //los ingredientes escogidos afectan al dexterity, la media de los dos ingreds (20-20) normales redondeada al multiplo de 5 inferior = 20 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = greaterVenomMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(3); //media de duraciones de los ingreds greater son (3-3) redondeada para abajo = 3  
                })
            })
            describe('cuando todos los efectos son tipos diferentes', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = mixedVenomMock // los ingredientes afectan al dexterity, tenemos 4 (uno de cada tipo)
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.dexterity).toBe(10); //los ingredientes escogidos afectan al dexterity, la media de los dos ingreds (5-10-15-20) normales redondeada al multiplo de 5 inferior = 12,5 => 10 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = mixedVenomMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(1); //media de duraciones de los ingreds greater son (1-1-2-3) redondeada para abajo = 1,75 => 1
                })
            })
            describe('Mismos tiers, comprobar nombre', () => {
                it('El nombre de la pocion sera Modifier + attribute + Elixir', () => {
                    //arrange		
                    const selectedIngredients = greaterVenomMock // usamos greater ingredietns
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.name).toBe('greater dexterity venom'); // asumimos que el nombre es Greater dexterity elixir
                })
            })
        })
        describe('Cuando no todos los ingredientes tienen el mismo atributo', () => {
            it('No podremos crear el elixir, el nombre no contendra Elixir', () => {
                //arrange		
                const selectedIngredients = falseAttrVenomMock // los ingredientes afectan al dex y al charisma
                //act
                const potion = createPotion(selectedIngredients);                    
                //assert
                expect(potion.name).not.toMatch('Venom'); // asumimos que el nombre es Greater dexterity elixir
            })
        })
    })
    describe('cuando los efectos en los ingredientes llevan "frenzy"', () => {
        describe('Cuando todos los ingredientes tienen el mismo atributo (insanity)', () => {
            describe('cuando todos los efectos son tipo least', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = leastFrenzyMock // usamos ingredientes least_calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.insanity).toBe(5); //los efectos al insanity tienen el signo invertido 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = leastFrenzyMock // usamos ingredientes least_calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(1); //media de duraciones de los ingreds least son (1-1) redondeada para abajo = 1  
                })
            })
            describe('cuando todos los efectos son tipo lesser', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = lesserFrenzyMock // usamos ingredientes lesser_calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.insanity).toBe(10); //signo positivo 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = lesserFrenzyMock // usamos ingredientes lesser_calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(1); //media de duraciones de los ingreds lesser son (1-1) redondeada para abajo = 1  
                })
            })
            describe('cuando todos los efectos son tipo normal ("")', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = voidFrenzyMock // usamos ingredientes calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.insanity).toBe(15); //signo positivo 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = voidFrenzyMock // usamos ingredientes calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(2); //media de duraciones de los ingreds normales son (2-2) redondeada para abajo = 2  
                })
            })
            describe('cuando todos los efectos son tipo greater', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = greaterFrenzyMock // usamos ingredientes greater_calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.insanity).toBe(20); //signo positivo
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = greaterFrenzyMock 
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(3); //media de duraciones de los ingreds greater son (3-3) redondeada para abajo = 3  
                })
            })
            describe('cuando todos los efectos son tipos diferentes', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = mixedFrenzyMock // los ingredientes afectan al insanity(frenzy), tenemos 4 (uno de cada tipo)
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.insanity).toBe(10); //los ingredientes escogidos afectan al insanity, la media de los dos ingreds (5-10-15-20) normales redondeada al multiplo de 5 inferior = 12,5 => 10 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = mixedFrenzyMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(1); //media de duraciones de los ingreds greater son (1-1-2-3) redondeada para abajo = 1,75 => 1
                })
            })
            describe('Mismos tiers, comprobar nombre', () => {
                it('El nombre de la pocion sera Modifier + attribute + Elixir', () => {
                    //arrange		
                    const selectedIngredients = greaterFrenzyMock // usamos greater ingredietns
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.name).toBe('greater frenzy venom'); // asumimos que el nombre es Greater frenzy venom
                })
            })
        })
        describe('Cuando no todos los ingredientes tienen el mismo effecto (calm)', () => {
            it('No podremos crear el elixir, el nombre no contendra Elixir', () => {
                //arrange		
                const selectedIngredients = falseAttrFrenzyMock // los ingredientes son calm y boost charisma
                //act
                const potion = createPotion(selectedIngredients);                    
                //assert
                expect(potion.name).toMatch('Failed Potion'); // el nombre no sera correcto 
            })
        })
    })
})

describe('FAIL - Si el numero de ingredientes es menor a 2 o mayor a 4', () => { //este test fallará, en la apk no es posible insertar un solo ingrediente, pero al caldero de pociones si.
    it('FAIL - El nombre de la pocion no sera correcto con 1 ingrediente', () => {
        //arrange		
        const selectedIngredients = singleIngredientVenom // usamos un solo ingrediente
        //act
        const potion = createPotion(selectedIngredients);                    
        //assert
        expect(potion.name).not.toMatch('venom'); // asumimos que el nombre no contendrá elixir
    })
    it('FAIL - El nombre de la pocion no sera correcto con 5 ingredientes', () => { //este test fallará, en la apk no es posible insertar mas de 4 ingredientes, pero al caldero de pociones si se le pueden meter hardcodeadas.
        //arrange		
        const selectedIngredients = multipleIngredientsVenom // usamos 5 ingredientes
        //act
        const potion = createPotion(selectedIngredients);                    
        //assert
        expect(potion.name).not.toMatch('venom'); // asumimos que el nombre no contendrá elixir
    })
})