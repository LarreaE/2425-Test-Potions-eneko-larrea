import Potion from '../Potions/Potion.js';

describe('Cuando todos los ingredientes', () => {
	it('should return the string in lowercase and plural', () => {
		const result = transformStringLowerPlural(lowerPlural);
		expect(result).toBe('boots');
	})
    
	it('should return the strings with the first letter to Uppercase and changed into singular', () => {
		const result = transformStringPlural(plural);
		expect(result).toBe('Boot');
	})

    it('should return the string firstletter Uppercase and changed it into plural', () => {
		const result = transformStringSingular(singular);
		expect(result).toBe('Boots');
	})
})