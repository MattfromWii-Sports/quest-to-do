const toDos = (() =>{

    //individual tasks
    class quest {
        constructor(title, description) {
            this.title = title;
            this.description = description;
            //if true --> done
            this.status = false; 
        }
    }

    //quests go here
    class questline {
        constructor(title, description, color) {
            this.title = title;
            this.description = description;
            this.color = color;
            //where quests will be stored
            this.storage = [];
        }
    }

});