//individual tasks
class Quest {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        this.isCompleted = false; 
    }
    //updates content of quest
    updateAll(title, description) {
        this.title = title;
        this.description = description;
    }
    //toggles completion status from false to true & vice versa
    toggleCompleted() {
        this.isCompleted = (this.isCompleted === true) ? false : true;
    }

    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getStatus() {
        return this.isCompleted;
    }
}

//quests go here
class Questline {
    constructor(title, description, color) {
        this.title = title;
        this.description = description;
        this.color = color;
        this.count = 0; //how many quests are stored
        //where quests will be stored
        this.storage = [];
    }

    getTitle() {
        return this.title;
    }
    getDescription() {
        return this.description;
    }
    getColor() {
        return this.color;
    }
    getCount() {
        return this.count;
    }

    //adds element to specific tier index
    //it will always be put at front, index 0
    addToTier(tierIndex, questObj) {
        //when questline content[] is empty
        if(tierIndex === 0 && this.storage.length === 0) {
            this.storage.push([]);
        }
        //checks if tierIndex valid
        if(tierIndex >= this.storage.length) {
            return false;
        }

        this.storage[tierIndex].unshift(questObj);
        this.count += 1;
        return this.storage[tierIndex][0]; //for checking purposes
    }

    //removes element at specific indices
    removeAtIndices(tierIndex, specificIndex) {
        //check if tierIndex & specificIndex are valid
        if(tierIndex >= this.storage.length || specificIndex >= this.tierSize(tierIndex)) {
            return false;
        }

        this.storage[tierIndex].splice(specificIndex, 1); //remove it
        this.count -= 1;
        return true;
    }

    //moves element at indices to next place/tier
    moveIndexDown(tierIndex, specificIndex) {
        //make sure values are integers first
        tierIndex = parseInt(tierIndex);
        specificIndex = parseInt(specificIndex);

        //check if tierIndex & specificIndex exist
        if(tierIndex >= this.storage.length || specificIndex >= this.tierSize(tierIndex)) {
            return false;
        }

        // first check if specificIndex is at the end
        // if so, need to move it to next tier
        if(specificIndex === this.tierSize(tierIndex) - 1) {
            //check if next tierIndex is present already
            if(tierIndex + 1 >= this.storage.length) {
                this.storage.push([]);
            }

            //get the element and add to start next tier
            this.addToTier(tierIndex + 1, this.storage[tierIndex][specificIndex]);
            //remove the duplicate
            this.removeAtIndices(tierIndex, specificIndex);

            //lastly check if original tier is empty -> if so remove it
            this.removeTierIfEmpty(tierIndex);

            return true;
        }

        //if specificIndex is not at the end -> swap within tier (tierIndex stays same)
        //specificIndex + 1 : swap with next place 
        console.log(this.swapIndices(tierIndex, specificIndex, tierIndex, specificIndex + 1));
        return true;
    }

    //moves element at indices to previous place/tier
    moveIndexUp(tierIndex, specificIndex) {
        //make sure values are integers first
        tierIndex = parseInt(tierIndex);
        specificIndex = parseInt(specificIndex);

        //check if tierIndex & specificIndex exist
        if(tierIndex >= this.storage.length || specificIndex >= this.tierSize(tierIndex)) {
            return false;
        }

        //first check if specificIndex is at the start
        //if so, need to move it to previous tier
        if(specificIndex === 0) {
            //check if tierIndex is at 0 (start) -> need to make new array
            if(tierIndex === 0) {
                this.storage.unshift([]);
                tierIndex += 1; //need to shift it by 1, since new array inserted at start
            }

            //get the element and add to previous tier
            //uses push to add to last position instead of first (addToTier)
            this.storage[tierIndex - 1].push(this.storage[tierIndex][specificIndex]);
            //remove the duplicate
            this.removeAtIndices(tierIndex, specificIndex);
            //counteract the decrease of 1 from remove function, add 1
            this.count += 1;

            //lastly check if original tier is empty -> if so remove it
            this.removeTierIfEmpty(tierIndex);

            return true;
        }

        //if specificIndex is not at the start -> swap within tier (tierIndex stays same)
        //specificIndex - 1 : swap with previous place 
        console.log(this.swapIndices(tierIndex, specificIndex, tierIndex, specificIndex - 1));
        return true;
    }

    //updates details
    updateAll(title, description, color) {
        this.title = title;
        this.description = description;
        this.color = color;
    }

    //selects quest
    atTierIndex(tierIndex, specificIndex) {
        if(tierIndex >= this.storage.length || specificIndex >= this.tierSize(tierIndex)) {
            return false;
        }
        return this.storage[tierIndex][specificIndex];
    }

    //helper functions

    //gets storage length (number of tiers)
    getNumberOfTiers() {
        return this.storage.length;
    }
    //gets tier length (number of elements in tier)
    tierSize(tierIndex) {
        if(tierIndex >= this.getNumberOfTiers()) {
            return false;
        }
        return this.storage[tierIndex].length;
    }

    //swaps two sets of indices 
    swapIndices(tierIndex1, index1, tierIndex2, index2) {
        const temp = this.storage[tierIndex1][index1];
        this.storage[tierIndex1][index1] = this.storage[tierIndex2][index2];
        this.storage[tierIndex2][index2] = temp;
        return [this.storage[tierIndex1][index1], this.storage[tierIndex2][index2]]; //for debugging
    }
    //removes tier
    removeTierIfEmpty(tierIndex) {
        if(this.storage[tierIndex].length === 0) {
            this.storage.splice(tierIndex, 1);
            return true;
        } 
        return false;
    }

    //prints elements at a tier (for debugging purposes)
    printAtTier(tierIndex) {
        if(tierIndex >= this.getNumberOfTiers()) {
            return 'Invalid Tier Index';
        }
        let x = '';
        for(let i = 0; i < this.tierSize(tierIndex); i++) {
            x += this.storage[tierIndex][i] + ', ';
        }
        console.log(x);
    }
}

export {Quest, Questline};