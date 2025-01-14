import axios from 'axios';

export const getIngredients = async () => {
    try {
        const url = `https://kaotika-server.fly.dev/ingredients`;
        const response = await axios.get(url);
        
        if (response.data && response.data.data) {
            return response.data.data
        } else {
          console.log('no potions found');
          
        }
      } catch (error) {
        console.error('Error fetching potions:', error.message);
      }
  };
  
export const getCurses = async () => {
try {
    const url = `https://kaotika-server.fly.dev/diseases`;
    const response = await axios.get(url);
    
    if (response.data && response.data.data) {
        return response.data.data
    } else {
        console.log('no curses found');
        
    }
    } catch (error) {
    console.error('Error fetching curses:', error.message);
    }
};