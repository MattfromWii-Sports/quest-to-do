import {Quest, Questline} from './quest-component.js'

//main class
class Todo {
    constructor(content) {
        this.content = content; //where everything is stored
    }

    //always adds at last position
    createNewQuestline(title, description, color) {
        this.content.push(new Questline(title, description, color));
    }

    //removes questline at index
    removeQuestline(index) {
        if(index >= this.content.length) {
            return false;
        }
        return this.content.splice(index, 1);
    }

    //takes index of questline
    //then adds to questline using its class function (tierIndex involved)
    addToQuestline(index, tierIndex, questObj) {
        if(index >= this.content.length) {
            return false;
        }
        return this.content[index].addToTier(tierIndex, questObj);
    }

    //removes quest from specific questline
    removeFromQuestline(index, tierIndex, specificIndex) {
        if(index >= this.content.length) {
            return false;
        }
        return this.content[index].removeAtIndices(tierIndex, specificIndex);
    }

    //moves quest position down
    moveDown(index, tierIndex, specificIndex) {
        if(index >= this.content.length) {
            return false;
        }
        return this.content[index].moveIndexDown(tierIndex, specificIndex);
    }

    //moves quest position up 
    moveUp(index, tierIndex, specificIndex) {
        if(index >= this.content.length) {
            return false;
        }
        return this.content[index].moveIndexUp(tierIndex, specificIndex);
    }

    //updates quest details
    updateQuestDetails() {

    }
    //updates quest status
    updateQuestStatus() {
        
    }

}

//testing
const test = () => {
    const x = new Todo([]);

    x.createNewQuestline('title', '...', 'dhfaks');
    x.createNewQuestline('sdasdahjs', '...', 'dhfaks');
    x.addToQuestline(0, 0, 'first');
    x.addToQuestline(0, 0, 'second');
    x.moveDown(0, 0, 1);

    console.log(x.content);
}

export {Todo, test};

