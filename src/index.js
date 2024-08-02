import './styles.css';
import {Todo} from './modules/to-do.js';
import {loadStaticElements, renderHome, renderQuestlines, renderSettings} from './modules/dom-manipulator.js'

const todo = new Todo(localStorage.getItem('todo') || []);
todo.createNewQuestline('title', 'description', 'color1');
todo.createNewQuestline('title', 'description', 'color1');
console.log(todo);

const sideBar = document.querySelector('.side');
const main = document.querySelector('.main');

//for sidebar buttons
sideBar.addEventListener('click', (e) => {
    if(e.target.classList.contains('home')) {
        console.log('home');
    } else if(e.target.classList.contains('questlines')) {
        renderQuestlines(todo.content);
    } else if(e.target.classList.contains('settings')) {
        console.log('settings');
    }
});

//load this first
loadStaticElements();