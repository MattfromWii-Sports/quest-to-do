import './styles.css';
import {Todo} from './modules/to-do.js';
import {loadStaticElements, renderHome, renderQuestlines, renderSettings, toggleKebabMenu, parentUp, showQuestlineModal, closeQuestlineModal} from './modules/dom-manipulator.js'

const todo = new Todo(localStorage.getItem('todo') || []);
todo.createNewQuestline('title', 'description', 'color1');
todo.createNewQuestline('title2', 'description2', 'color12');
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

function questlineEvents(e) {
    const targetClass = e.target.classList;
    const target = e.target;

    if(targetClass.contains('main')) {
        return; //nothing happens
    }

    if(targetClass.contains('questline-add-btn')) {
        showQuestlineModal();
        console.log('new ql');

    } else if(targetClass.contains('move-btn')) {
        todo.moveQuestline(parentUp(target, 4).dataset.todoIndex);  
        renderQuestlines(todo.content); 
        console.log('move');
    } else if(targetClass.contains('edit-btn')) {
        showQuestlineModal(); //add parameters later on pls
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

//for modals
const questlineForm = document.querySelector('.questline-form');
questlineForm.addEventListener('click', e => {
    e.preventDefault();
    if(e.target.classList.contains('questline-form-cancel-btn')) { 
        //reset it
        closeQuestlineModal();
    } else if(e.target.classList.contains('questline-form-submit-btn')) { 
        //
        closeQuestlineModal();
    }
});

//temporary
// showQuestlineModal();

//load this first
loadStaticElements();