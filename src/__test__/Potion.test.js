import Potion from '../Potions/Potion.js'
import  { antidoteMock ,gravechillMock, falseAntidoteMock, poisonMock, falsePoisonMock, leastElixiMock, lesserElixirMock, voidElixirMock, greaterElixirMock, mixedElixirMock, falseAttrElixirMock, leastCalmMock, lesserCalmMock, voidCalmMock, greaterCalmMock, mixedCalmMock, falseAttrCalmMock, singleIngredient, multipleIngredients} from '../mocks/individual.js'
import curses from '../mocks/curses.json'
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

//POSION
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

//ELIXIR

describe('Cuando el numeo de ingredientes es 2-4', () => {
    describe('cuando los efectos en los ingredientes llevan "boost"', () => {
        describe('Cuando todos los ingredientes tienen el mismo atributo (DEX,INT...)', () => {
            describe('cuando todos los efectos son tipo least', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = leastElixiMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.charisma).toBe(5); //los ingredientes escogidos afectan a la charisma, la media de los dos ingreds (5-5) least redondeada al multiplo de 5 inferior(5) 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = leastElixiMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(1); //media de duraciones de los ingreds least son (1-1) redondeada para abajo = 1  
                })
            })
            describe('cuando todos los efectos son tipo lesser', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = lesserElixirMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.dexterity).toBe(10); //los ingredientes escogidos afectan al dexterity, la media de los dos ingreds (10-10) lesser redondeada al multiplo de 5 inferior = 10 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = lesserElixirMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(1); //media de duraciones de los ingreds lesser son (1-1) redondeada para abajo = 1  
                })
            })
            describe('cuando todos los efectos son tipo normal ("")', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = voidElixirMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.charisma).toBe(15); //los ingredientes escogidos afectan al charisma, la media de los dos ingreds (15-15) normales redondeada al multiplo de 5 inferior = 15 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = voidElixirMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(2); //media de duraciones de los ingreds normales son (2-2) redondeada para abajo = 2  
                })
            })
            describe('cuando todos los efectos son tipo greater', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = greaterElixirMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.dexterity).toBe(20); //los ingredientes escogidos afectan al dexterity, la media de los dos ingreds (20-20) normales redondeada al multiplo de 5 inferior = 20 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = greaterElixirMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(3); //media de duraciones de los ingreds greater son (3-3) redondeada para abajo = 3  
                })
            })
            describe('cuando todos los efectos son tipos diferentes', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = mixedElixirMock // los ingredientes afectan al dexterity, tenemos 4 (uno de cada tipo)
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.dexterity).toBe(10); //los ingredientes escogidos afectan al dexterity, la media de los dos ingreds (5-10-15-20) normales redondeada al multiplo de 5 inferior = 12,5 => 10 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = mixedElixirMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(1); //media de duraciones de los ingreds greater son (1-1-2-3) redondeada para abajo = 1,75 => 1
                })
            })
            describe('Mismos tiers, comprobar nombre', () => {
                it('El nombre de la pocion sera Modifier + attribute + Elixir', () => {
                    //arrange		
                    const selectedIngredients = greaterElixirMock // usamos greater ingredietns
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.name).toBe('greater dexterity elixir'); // asumimos que el nombre es Greater dexterity elixir
                })
            })
        })
        describe('Cuando no todos los ingredientes tienen el mismo atributo', () => {
            it('No podremos crear el elixir, el nombre no contendra Elixir', () => {
                //arrange		
                const selectedIngredients = falseAttrElixirMock // los ingredientes afectan al dex y al charisma
                //act
                const potion = createPotion(selectedIngredients);                    
                //assert
                expect(potion.name).not.toMatch('Elixir'); // asumimos que el nombre es Greater dexterity elixir
            })
        })
	})
    describe('cuando los efectos en los ingredientes llevan "calm"', () => {
        describe('Cuando todos los ingredientes tienen el mismo atributo (insanity)', () => {
            describe('cuando todos los efectos son tipo least', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = leastCalmMock // usamos ingredientes least_calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.insanity).toBe(-5); //los efectos al insanity tienen el signo invertido 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = leastCalmMock // usamos ingredientes least_calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(1); //media de duraciones de los ingreds least son (1-1) redondeada para abajo = 1  
                })
            })
            describe('cuando todos los efectos son tipo lesser', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = lesserCalmMock // usamos ingredientes lesser_calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.insanity).toBe(-10); //signo negativo 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = lesserCalmMock // usamos ingredientes lesser_calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(1); //media de duraciones de los ingreds lesser son (1-1) redondeada para abajo = 1  
                })
            })
            describe('cuando todos los efectos son tipo normal ("")', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = voidCalmMock // usamos ingredientes calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.insanity).toBe(-15); //signo negativo 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = voidCalmMock // usamos ingredientes calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(2); //media de duraciones de los ingreds normales son (2-2) redondeada para abajo = 2  
                })
            })
            describe('cuando todos los efectos son tipo greater', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = greaterCalmMock // usamos ingredientes greater_calm
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.insanity).toBe(-20); //signo negativo
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = greaterCalmMock // usigno ngevativo
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(3); //media de duraciones de los ingreds greater son (3-3) redondeada para abajo = 3  
                })
            })
            describe('cuando todos los efectos son tipos diferentes', () => {
                it('El valor resultante del atributo sera la media de los values de los ingredientes. Una vez calculada la media se redondeara al multiplo de 5 inferior', () => {
                    //arrange		
                    const selectedIngredients = mixedCalmMock // los ingredientes afectan al insanity(calm), tenemos 4 (uno de cada tipo)
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.modifiers.insanity).toBe(-10); //los ingredientes escogidos afectan al insanity, la media de los dos ingreds (5-10-15-20) normales redondeada al multiplo de 5 inferior = 12,5 => 10 
                })
                it('la duracion sera la media de duraciones de cada ingrediente redondeada para abajo', () => {
                    //arrange		
                    const selectedIngredients = mixedCalmMock // usamos ingredientes correctos
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.duration).toBe(1); //media de duraciones de los ingreds greater son (1-1-2-3) redondeada para abajo = 1,75 => 1
                })
            })
            describe('Mismos tiers, comprobar nombre', () => {
                it('El nombre de la pocion sera Modifier + attribute + Elixir', () => {
                    //arrange		
                    const selectedIngredients = greaterCalmMock // usamos greater ingredietns
                    //act
                    const potion = createPotion(selectedIngredients);                    
                    //assert
                    expect(potion.name).toBe('greater calm elixir'); // asumimos que el nombre es Greater dexterity elixir
                })
            })
        })
        describe('Cuando no todos los ingredientes tienen el mismo effecto (calm)', () => {
            it('No podremos crear el elixir, el nombre no contendra Elixir', () => {
                //arrange		
                const selectedIngredients = falseAttrCalmMock // los ingredientes son calm y boost charisma
                //act
                const potion = createPotion(selectedIngredients);                    
                //assert
                expect(potion.name).toMatch('Failed Potion'); // el nombre no sera correcto 
            })
        })
	})
})

describe('Si el numero de ingredientes es menor a 2 o mayor a 4', () => { //este test fallará, en la apk no es posible insertar un solo ingrediente, pero al caldero de pociones si.
    it('El nombre de la pocion no sera correcto con 1 ingrediente', () => {
        //arrange		
        const selectedIngredients = singleIngredient // usamos un solo ingrediente
        //act
        const potion = createPotion(selectedIngredients);                    
        //assert
        expect(potion.name).not.toMatch('elixir'); // asumimos que el nombre no contendrá elixir
    })
    it('El nombre de la pocion no sera correcto con 5 ingredientes', () => { //este test fallará, en la apk no es posible insertar mas de 4 ingredientes, pero al caldero de pociones si se le pueden meter hardcodeadas.
        //arrange		
        const selectedIngredients = multipleIngredients // usamos 5 ingredientes
        //act
        const potion = createPotion(selectedIngredients);                    
        //assert
        expect(potion.name).not.toMatch('elixir'); // asumimos que el nombre no contendrá elixir
    })
})