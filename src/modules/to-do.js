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
    //updates completion status
    updateCompleted(booleanVal) {
        this.isCompleted = booleanVal;
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
    //adds to specific tier index
    //it will always be put at front, index 0
    addToIndex(tierIndex, questObj) {
        //when questline content[] is empty
        if(tierIndex === 0 && this.storage.length === 0) {
            this.storage.push([]);
        }
        //checks if tierIndex valid
        if(tierIndex >= this.storage.length) {
            return 0;
        }
        this.storage[tierIndex].unshift(questObj);
        return this.storage[tierIndex][0]; //for checking purposes
    }
    removeAtIndex(tierIndex, specificIndex) {
        //check if tierIndex & specificIndex are valid
        if(tierIndex >= this.storage.length || specificIndex >= this.storage[tierIndex].length) {
            return 0;
        }
        //remove element
        return this.storage[tierIndex].splice(specificIndex, 1);
    }

    moveIndexDown(tierIndex, specificIndex) {
        //check if tierIndex & specificIndex are valid
        if(tierIndex >= this.storage.length || specificIndex >= this.storage[tierIndex].length) {
            return 0;
        }
        //first check if specificIndex is at the end
        //if so, need to move it to next tier
        if(specificIndex === this.storage[tierIndex].length - 1) {
            //check if next tierIndex is present already
            if(tierIndex + 1 >= this.storage.length) {
                this.storage.push([]);
            }
            //tierIndex + 1 : next tier
            //0 : first 
            this.swapIndices(tierIndex, specificIndex, tierIndex + 1, 0);
            //if the next tier is empty -> undefined will be swapped, must be removed
            if(this.storage[tierIndex][specificIndex] === undefined) {
                this.removeAtIndex(tierIndex, specificIndex);
            }
            return 1;
        }
        //if specificIndex is not at the end -> swap within tier (tierIndex stays same)
        //specificIndex + 1 : swap with next place 
        this.swapIndices(tierIndex, specificIndex, tierIndex, specificIndex + 1);
        return 1;
    }
    moveIndexUp(tierIndex, specificIndex) {
        //check if tierIndex & specificIndex are valid
        if(tierIndex >= this.storage.length || specificIndex >= this.storage[tierIndex].length) {
            return 0;
        }

        //NEED TO FIX TOMMOROW (APPLY LOGIC TO THIS)

        //check if specificIndex is at the start
        //if so, need to move it to previous tier
        if(specificIndex === this.storage[tierIndex].length - 1) {
            //check if next tierIndex is present already
            if(tierIndex + 1 >= this.storage.length) {
                this.storage.push([]);
            }
            //tierIndex + 1 : next tier
            //0 : first 
            this.swapIndices(tierIndex, specificIndex, tierIndex + 1, 0);
            //if the next tier is empty -> undefined will be swapped, must be removed
            if(this.storage[tierIndex][specificIndex] === undefined) {
                this.removeAtIndex(tierIndex, specificIndex);
            }
            return 1;
        }
        //if specificIndex is not at the end -> swap within tier (tierIndex stays same)
        //specificIndex + 1 : swap with next place 
        this.swapIndices(tierIndex, specificIndex, tierIndex, specificIndex + 1);
        return 1;
    }

    //helper functions
    swapIndices(tierIndex1, index1, tierIndex2, index2) {
        const temp = this.storage[tierIndex1][index1]
        this.storage[tierIndex1][index1] = this.storage[tierIndex2][index2];
        this.storage[tierIndex2][index2] = temp;
    }
}

//main class
class Todo {
    constructor(content) {
        this.content = content;
    }
    //always adds new at index 0
    addQuestline(questlineObj) {

    }
    //takes index of questline
    //then adds to questline using its class function
    addQuestToQuestline(index, questObj) {

    }
}

//testing
const test = () => {
    const x = new Questline('a', 'b', 'c');

    x.addToIndex(0, 'sda');
    x.addToIndex(0, 'ffff');
    console.log(x.storage[0]);

    // x.moveIndexDown(0, 1);
    x.moveIndexDown(0, 0);
    x.moveIndexDown(0, 1);
    
    console.log(x.storage);
}

export {Todo, 
    // for testing
    test,
};

