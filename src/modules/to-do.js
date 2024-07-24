//individual tasks
class quest {
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

//main class
class todo {
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

export {todo};