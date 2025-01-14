import Potion from "./Potions/Potion.js";
import { getIngredients, getCurses } from "./data.js";
import { antidoteMock } from "./mocks/individual.js";
import curses from './mocks/curses.json'


export const createPotion = (selectedIngredients) => {  
    // const potionIngredients = Object.keys(selectedIngredients).flatMap(id => {
    //   const ingredient = allIngredients.find(ing => ing._id === id);
    //   const quantity = selectedIngredients[id];
    //   if (ingredient) {
    //     return Array(quantity).fill({ ...ingredient });
    //   }
    //   return [];
    // });

    const potionIngredients = selectedIngredients;

    try {
      const newpotion = Potion.create(potionIngredients, curses);
      return newpotion;
    } catch (error) {
      console.error('Error creating potion:', error);
    }
  };

  
  const antidote = createPotion(antidoteMock)

  
  
  