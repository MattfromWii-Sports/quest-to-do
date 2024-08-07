import './styles.css';
import {Todo} from './modules/to-do.js';
import {Quest} from './modules/quest-component.js';
import {loadStaticElements, renderHome, renderQuestlines, renderSettings, toggleKebabMenu, parentUp,  closeKebabMenu} from './modules/dom-manipulator.js'
import {showQuestlineModal, closeQuestlineModal, getQuestlineModal} from './modules/modals.js'

const todo = new Todo(localStorage.getItem('todo') || []);
todo.createNewQuestline('titlesda asdaksjd aksjdaksjd aksdjak  hdfhshdf sjdfhsjdhfjs dfjhsjdfh ', 'description', '#ff0000');
todo.createNewQuestline('title2', 'description2', '#0000cc');
console.log(todo);

const sideBar = document.querySelector('.side');
const main = document.querySelector('.main');

//for tabs
//tracks events that may occur in main (DO NOT FORGET TO UPDATE THIS)
let currentEvents = 'quest';

//for sidebar buttons
sideBar.addEventListener('click', (e) => {
    if(e.target.classList.contains('home')) {
        currentEvents = 'quest'; //basically home

    } else if(e.target.classList.contains('questlines')) {
        currentEvents = 'questlines';
        renderQuestlines(todo.content);

    } else if(e.target.classList.contains('settings')) {
        currentEvents = 'settings';
    }
});

main.addEventListener('click', (e) => {
    const target = e.target;
    //check if main was pressed 
    if(target.classList.contains('main')) {
        closeKebabMenu(); //close open kebab menus
        return; //nothing happens
    }
    //kebab menu for all
    if(target.classList.contains('kebab-menu')) {
        toggleKebabMenu(target);
        return;
    }

    //other listeners
    switch(currentEvents) {
        case 'home': ;
        case 'questlines': questlineEvents(target);
        case 'settings': ;
    }
});

let currentQuestlineIndex; //index of current edit of questline (code is very messy)
function questlineEvents(target) {
    const targetClass = target.classList;

    if(targetClass.contains('questline-add-btn')) {
        currentQuestlineIndex = null;
        showQuestlineModal();
        console.log('new ql');

    } else if(targetClass.contains('move-btn')) {
        todo.moveQuestline(parentUp(target, 4).dataset.todoIndex);  
        renderQuestlines(todo.content); 
        console.log('move');

    } else if(targetClass.contains('edit-btn')) {
        currentQuestlineIndex = parentUp(target, 4).dataset.todoIndex; //questline index
        const questlineNode = todo.atQuestline(currentQuestlineIndex);
        closeKebabMenu();
        showQuestlineModal(questlineNode.getTitle(), questlineNode.getDescription(), questlineNode.getColor());
        console.log('edit');

    } else if(targetClass.contains('delete-btn')) {
        todo.removeQuestline(parentUp(target, 4).dataset.todoIndex);
        renderQuestlines(todo.content);
        console.log('delete'); 
    } else { //works since main click accounted for
        console.log('open ql');
    }
}

function questEvents(target) {
    const targetClass = target.classList;
}

//questline form listener
const questlineForm = document.querySelector('.questline-form');
questlineForm.addEventListener('click', e => {
    //note: prevent default stops color picker :)
    if(e.target.classList.contains('questline-form-cancel-btn')) { 
        closeQuestlineModal();

    } else if(e.target.classList.contains('questline-form-submit-btn')) { 
        e.preventDefault();
        const values = getQuestlineModal();
        if(currentQuestlineIndex === null) { //create new questline
            todo.createNewQuestline(values.title, values.description, values.color);
            currentQuestlineIndex = 0;
        } else { 
            todo.atQuestline(currentQuestlineIndex).updateAll(values.title, values.description, values.color); //add here
        }
        closeQuestlineModal();
        renderQuestlines(todo.content);
    }
});

//load this first
loadStaticElements();