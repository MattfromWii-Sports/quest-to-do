import './styles.css';
import {Todo} from './modules/to-do.js';
import {loadStaticElements, renderHome, renderQuestlines, renderSettings, toggleKebabMenu, parentUp} from './modules/dom-manipulator.js'

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

let currentTab = 'home';
main.addEventListener('click', (e) => {
    const target = e.target;
    switch(currentTab) {
        case 'home': ;
        case 'questlines': questlineEvents(target);
        case 'settings': ;
    }
});

function questlineEvents(target) {
    const targetClass = target.classList;
    if(targetClass.contains('questline-add-btn')) {
        console.log('new ql');
    }  else if(targetClass.contains('move-btn')) {
        todo.moveQuestline(parentUp(target, 4).dataset.todoIndex);  
        renderQuestlines(todo.content); 
        console.log('move');
    } else if(targetClass.contains('edit-btn')) {
        console.log('edit');

    } else if(targetClass.contains('delete-btn')) {
        todo.removeQuestline(parentUp(target, 4).dataset.todoIndex);
        renderQuestlines(todo.content);
        console.log('delete');

    } else if(targetClass.contains('kebab-menu')){  
        toggleKebabMenu(target);
    } else {
        console.log('open ql');
    }
    
}

//load this first
loadStaticElements();