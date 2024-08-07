import {Quest, Questline} from './quest-component.js'

//main class
class Todo {
    constructor(content) {
        this.content = content; //where everything is stored
    }

    atQuestline(index) { //uses this to traverse questlines
        if(index >= this.content,length) {
            return false;
        }
        return this.content[index];
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
    //move questline to top
    moveQuestline(index) {
        if(index >= this.content.length) {
            return false;
        }
        let temp = this.content[index];
        this.removeQuestline(index);
        this.content.unshift(temp);
        return true;
    }
}

export {Todo};

