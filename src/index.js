import './styles.css';
import {Todo, test} from './modules/to-do.js';
import {clear, loadPreImages, renderHome, renderQuestlines, renderSettings} from './modules/dom-manipulator.js'

const todo = new Todo(localStorage.getItem('todo') || []);
todo.createNewQuestline('title', 'description', 'color1');
console.log(todo);

//for hamburger icon logic
//please remember: only OPENS/CLOSES on SMALLER width
const hamburgerIcon = document.querySelector('.hamburger-icon');
const sideBar = document.querySelector('.side');
let hamburgerOpen = true;
hamburgerIcon.addEventListener('click', () => {
    let mobileWidth = 700; //remember to match it with css media queries
    if(window.innerWidth >=  mobileWidth) {
        return; //not mobile :(
    }
    if(hamburgerOpen === true) {
        hamburgerIcon.classList.remove('open');
        sideBar.classList.remove('open');
        hamburgerOpen = false;
    } else {
        hamburgerIcon.classList.add('open');
        sideBar.classList.add('open');
        hamburgerOpen = true;
    }
    console.log('hamburger: ' + hamburgerOpen);
});

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

//for listeners in main
const main = document.querySelector('.main');

//load this first
loadPreImages();