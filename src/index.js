import './styles.css';
import menu from './images/menu.svg';

console.log(menu);

//for hamburger icon logic
const hamburgerIcon = document.querySelector('.hamburger-icon');
let hamburgerToggle = false;
hamburgerIcon.addEventListener('click', () => {
    let mobileWidth = 700; //remember to match it with css media queries
    if(window.innerWidth >=  700) {
        return; //not mobile :(
    }
    if(hamburgerToggle === true) {
        hamburgerIcon.classList.remove('open');
        hamburgerToggle = false;
    } else {
        hamburgerIcon.classList.add('open');
        hamburgerToggle = true;
    }
});