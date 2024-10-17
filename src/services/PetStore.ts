import { Pet } from '../models/Pet';

export class PetStore {
    private pets: Pet[];

    constructor(pets: Pet[]) {
        this.pets = pets;
    }

    countPetsByRepeatedNames(): { [key: string]: number } {
        const nameCount: { [key: string]: number } = {};
    
        this.pets.forEach(pet => {
            if (nameCount[pet.name]) {
                nameCount[pet.name]++;
            } else {
                nameCount[pet.name] = 1;
            }
        });
    
        // Filter out names with a count of 1
        const filteredNameCount: { [key: string]: number } = {};
        for (const name in nameCount) {
            if (nameCount[name] > 1) {
                filteredNameCount[name] = nameCount[name];
            }
        }
    
        return filteredNameCount;
    }
}