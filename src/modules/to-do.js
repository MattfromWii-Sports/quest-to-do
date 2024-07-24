class todo {
    constructor(content) {
        
    }
}

//individual tasks
class quest {
    constructor(title, description) {
        this.title = title;
        this.description = description;
        //if true --> done
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
class questline {
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
    addToIndex(tierIndex) {

    }
    removeAtIndex(tierIndex, specificIndex) {

    }
}