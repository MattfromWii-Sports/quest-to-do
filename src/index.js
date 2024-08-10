import './styles.css';
import {Todo} from './modules/to-do.js';
import {Quest} from './modules/quest-component.js';
import {loadStaticElements, renderHome, renderQuestlines, renderSettings, renderQuestlineQuests,toggleKebabMenu, closeKebabMenu,parentUp, findParent} from './modules/dom-manipulator.js'
import {showQuestlineModal, closeQuestlineModal, getQuestlineModal} from './modules/modals.js'

const todo = new Todo(localStorage.getItem('todo') || []);
todo.createNewQuestline('titlesda asdaksjd aksjdaksjd aksdjak  hdfhshdf sjdfhsjdhfjs dfjhsjdfh ', 'description', '#ff0000');
todo.createNewQuestline('title2', 'description2', '#0000cc');
todo.atQuestline(0).addToTier(0, new Quest('title', 'hdaksdh', 'colour'));
todo.atQuestline(0).addToTier(0, new Quest('title2', 'hdaksdh', 'colour'));
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
        case 'quest': questEvents(target); break;
        case 'questlines': questlineEvents(target); break;
        case 'settings': break;
    }
});

let currentQuestlineIndex; //index of current edit of questline (code is very messy)
function questlineEvents(target) {
    const targetClass = target.classList;

    if(targetClass.contains('questline-add-btn')) {
        currentQuestlineIndex = null;
        showQuestlineModal();
        return;
    } 
    
    //things needing questline datasets
    const current = findParent(target, 'questline-container');

    if(targetClass.contains('move-btn')) {
        todo.moveQuestline(current.dataset.todoIndex);  
        renderQuestlines(todo.content); 

    } else if(targetClass.contains('edit-btn')) {
        currentQuestlineIndex = current.dataset.todoIndex; //questline index
        const questlineNode = todo.atQuestline(currentQuestlineIndex);
        closeKebabMenu();
        showQuestlineModal(questlineNode.getTitle(), questlineNode.getDescription(), questlineNode.getColor());

    } else if(targetClass.contains('delete-btn')) {
        todo.removeQuestline(current.dataset.todoIndex);
        renderQuestlines(todo.content); 

    } else { //works since main click accounted for
        currentQuestlineIndex = current.dataset.todoIndex;
        currentEvents = 'quest';
        renderQuestlineQuests(todo, currentQuestlineIndex);
    }
}

function questEvents(target) {
    const targetClass = target.classList;

    if(targetClass.contains('quest-add-btn')) {
        console.log('add q');
        return;
    }

    const current = findParent(target, 'quest-container'); //contains datasets

    if(targetClass.contains('move-up-btn')) { 
        todo.atQuestline(current.dataset.todoIndex).moveIndexUp(current.dataset.todoTier, current.dataset.todoSpecificIndex);
        renderQuestlineQuests(todo, currentQuestlineIndex);
        console.log('move up');

    } else if(targetClass.contains('move-down-btn')) {     
        todo.atQuestline(current.dataset.todoIndex).moveIndexDown(current.dataset.todoTier, current.dataset.todoSpecificIndex);
        renderQuestlineQuests(todo, currentQuestlineIndex);
        console.log('move down');

    } else if(targetClass.contains('edit-btn')) {
        closeKebabMenu();
        console.log('edit');

    } else if(targetClass.contains('delete-btn')) {
        renderQuestlineQuests(todo, currentQuestlineIndex);
        console.log('delete');

    } else {
        console.log('open');
    }

    console.log(todo.content.atQuestline(currentQuestlineIndex));
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