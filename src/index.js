import './styles.css';
import {Todo, test} from './modules/to-do.js';

const t = new Todo([{}, {}]);
test();

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