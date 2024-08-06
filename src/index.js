import './styles.css';
import {Todo} from './modules/to-do.js';
import {loadStaticElements, renderHome, renderQuestlines, renderSettings, toggleKebabMenu, parentUp, showQuestlineModal, closeQuestlineModal, closeKebabMenu, getQuestlineModal} from './modules/dom-manipulator.js'

const todo = new Todo(localStorage.getItem('todo') || []);
todo.createNewQuestline('titlesda asdaksjd aksjdaksjd aksdjak  hdfhshdf sjdfhsjdhfjs dfjhsjdfh ', 'description', '#ff0000');
todo.createNewQuestline('title2', 'description2', '#0000cc');
console.log(todo);

const sideBar = document.querySelector('.side');
const main = document.querySelector('.main');

//for sidebar buttons
sideBar.addEventListener('click', (e) => {
    if(e.target.classList.contains('home')) {
        currentTab = 'home';
        console.log('home');
    } else if(e.target.classList.contains('questlines')) {
        currentTab = 'questlines';
        renderQuestlines(todo.content);
    } else if(e.target.classList.contains('settings')) {
        currentTab = 'settings';
        console.log('settings');
    }
});

//for tabs
let currentTab = 'home';
main.addEventListener('click', (e) => {
    switch(currentTab) {
        case 'home': ;
        case 'questlines': questlineEvents(e);
        case 'settings': ;
    }
});

let currentQuestlineIndex; //index of current edit of questline (code is very messy)
function questlineEvents(e) {
    const targetClass = e.target.classList;
    const target = e.target;

    if(targetClass.contains('main')) {
        closeKebabMenu(); //close open kebab menus
        return; //nothing happens
    }

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

    } else if(targetClass.contains('kebab-menu')){  
        toggleKebabMenu(target);
    } else { //works since main click accounted for
        console.log('open ql');
    }
}

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

//temporary
// showQuestlineModal();

//load this first
loadStaticElements();