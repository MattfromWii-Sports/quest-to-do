import './styles.css';
import {Todo} from './modules/to-do.js';
import {Quest} from './modules/quest-component.js';
import {loadStaticElements, renderHome, renderQuestlines, renderSettings, renderQuestlineQuests,toggleKebabMenu, closeKebabMenu,parentUp, findParent} from './modules/dom-manipulator.js'
import {showQuestlineModal, closeQuestlineModal, getQuestlineModal, showQuestModal, closeQuestModal, getQuestModal} from './modules/modals.js'

const todo = new Todo(localStorage.getItem('todo') || []);
todo.createNewQuestline('titlesda asdaksjd aksjdaksjd aksdjak  hdfhshdf sjdfhsjdhfjs dfjhsjdfh ', 'description', '#ff0000');
todo.createNewQuestline('title2', 'description2', '#0000cc');
todo.atQuestline(0).addToTier(0, new Quest('title', 'hdaksdh', 'colour'));
todo.atQuestline(0).addToTier(0, new Quest('title2', 'I am a description kxkdks', 'colour'));
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

//both used for forms also
let currentQuestlineIndex; //index of current edit of questline 
let currentQuestTier; //index of current tier of quest
let currentQuestIndex; //index of specific tier of quest, if null --> create new quest

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
        currentQuestlineIndex = parseInt(target.dataset.todoIndex);
        currentQuestTier = parseInt(target.dataset.todoTierIndex);
        currentQuestIndex = null;
        showQuestModal();
        return;
    }

    const current = findParent(target, 'quest-container'); //contains datasets
    currentQuestlineIndex = parseInt(current.dataset.todoIndex);
    currentQuestTier = parseInt(current.dataset.todoTierIndex);
    currentQuestIndex = parseInt(current.dataset.todoSpecificIndex);

    if(targetClass.contains('move-up-btn')) { 
        todo.atQuestline(currentQuestlineIndex).moveIndexUp(currentQuestTier, currentQuestIndex);
        renderQuestlineQuests(todo, currentQuestlineIndex);
        console.log('move up');

    } else if(targetClass.contains('move-down-btn')) {     
        todo.atQuestline(currentQuestlineIndex).moveIndexDown(currentQuestTier, currentQuestIndex);
        renderQuestlineQuests(todo, currentQuestlineIndex);
        console.log('move down');

    } else if(targetClass.contains('edit-btn')) {
        closeKebabMenu();
        const questNode = todo.atQuestline(currentQuestlineIndex).atTierIndex(currentQuestTier, currentQuestIndex);
        showQuestModal(questNode.getTitle(), questNode.getDescription());
        console.log('edit');

    } else if(targetClass.contains('delete-btn')) {
        todo.atQuestline(currentQuestlineIndex).removeAtIndices(currentQuestTier, currentQuestIndex);
        renderQuestlineQuests(todo, currentQuestlineIndex);
        console.log('delete');

    } else {
        console.log('open');
    }

    console.log(todo.atQuestline(currentQuestlineIndex));
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
            todo.atQuestline(currentQuestlineIndex).updateAll(values.title, values.description, values.color);
        }
        closeQuestlineModal();
        renderQuestlines(todo.content);
    }
});

const questForm = document.querySelector('.quest-form');
questForm.addEventListener('click', e => {
    if(e.target.classList.contains('quest-form-cancel-btn')) { 
        closeQuestModal();
    } else if(e.target.classList.contains('quest-form-submit-btn')) { 
        e.preventDefault();
        const values = getQuestModal();
        if(currentQuestIndex === null) { //create new quest
            todo.atQuestline(currentQuestlineIndex).addToTier(parseInt(currentQuestTier), new Quest(values.title, values.description));
        } else { 
            
        }
        closeQuestModal();
        renderQuestlineQuests(todo, currentQuestlineIndex);
    }
});

//load this first
loadStaticElements();