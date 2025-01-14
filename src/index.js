import Potion from "./Potions/Potion.js";
import { getIngredients, getCurses } from "./data.js";


const allIngredients = await getIngredients();
const curses = await getCurses();

console.log(allIngredients);
console.log(curses);


const createPotion = (selectedIngredients) => {
    console.log('createPotion called with:', selectedIngredients);
  
    // const potionIngredients = Object.keys(selectedIngredients).flatMap(id => {
    //   const ingredient = allIngredients.find(ing => ing._id === id);
    //   const quantity = selectedIngredients[id];
    //   if (ingredient) {
    //     return Array(quantity).fill({ ...ingredient });
    //   }
    //   return [];
    // });

    const potionIngredients = selectedIngredients;
    console.log('Selected Ingredients for Potion:', potionIngredients);

    try {
      const newpotion = Potion.create(potionIngredients, curses);
      return newpotion;
    } catch (error) {
      console.error('Error creating potion:', error);
    }
  };

  const selectedIngreds = [allIngredients[0], allIngredients[0]]
  
  const potion = createPotion(selectedIngreds)
  console.log(potion.name);
  
  