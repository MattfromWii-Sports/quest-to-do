import {Quest, Questline} from './quest-component.js'

//main class
class Todo {
    constructor(content) {
        this.content = content; //where everything is stored
    }

    atQuestline(index) {
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
    updateQuestDetails(index, tierIndex, specificIndex, title, description) {
        const currentQl = this.content[index];
        if(index >= this.content.length || tierIndex >= currentQl.getNumberOfTiers() || specificIndex >= currentQl.tierSize(tierIndex)) {
            return false;
        }
        currentQl.atTierIndex(tierIndex, specificIndex).updateAll(title, description);
        return true;
    }
    //updates quest status
    toggleQuestStatus(index, tierIndex, specificIndex) {
        const currentQl = this.content[index];
        if(index >= this.content.length || tierIndex >= currentQl.getNumberOfTiers() || specificIndex >= currentQl.tierSize(tierIndex)) {
            return false;
        }
        currentQl.atTierIndex(tierIndex, specificIndex).toggleCompleted();
        return true;
    }

}

//testing
const test = () => {
    const x = new Todo([]);

    x.createNewQuestline('title', '...', 'dhfaks');
    x.addToQuestline(0, 0, new Quest('title1', 'desc1'));
    x.addToQuestline(0, 0, new Quest('title2', 'desc2'));
    x.moveDown(0, 0, 1);
    console.log(x.content);
    x.updateQuestDetails(0, 0, 0, 'new title', 'new desc');
    x.toggleQuestStatus(0, 0, 0);
    
    console.log(x.content);
}

export {Todo, test};

