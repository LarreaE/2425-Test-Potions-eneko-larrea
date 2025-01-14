import Potion from "./Potions/Potion.js";
import { getIngredients, getCurses } from "./data.js";
import { antidoteMock, falseAntidoteMock } from "./mocks/individual.js";
import curses from './mocks/curses.json'


export const createPotion = (selectedIngredients) => {  
  
    if (selectedIngredients.length > 4 || selectedIngredients.length < 2) {
      return Potion.create(falseAntidoteMock,curses)
    }

    const potionIngredients = selectedIngredients;

    try {
      const newpotion = Potion.create(potionIngredients, curses);
      return newpotion;
    } catch (error) {
      console.error('Error creating potion:', error);
    }
  };

  
  const antidote = createPotion(antidoteMock)

  
  
  