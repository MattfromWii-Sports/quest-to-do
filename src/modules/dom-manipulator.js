import menuImg from '../images/menu.svg';
import kebabImg from '../images/dots-vertical.svg';

const mainDiv = document.querySelector('.main');

//loads images that will stay in the dom
function loadStaticElements() {
    const hamburger = document.querySelector('.hamburger-icon');
    const sidebar = document.querySelector('.side');
    hamburger.src = menuImg;
    //please remember: only OPENS/CLOSES on SMALLER width
    hamburger.addEventListener('click', () => {
        let mobileWidth = 700; //remember to match it with css media queries
        if(window.innerWidth >=  mobileWidth) {
            return; //not mobile :(
        }
        if(hamburger.classList.contains('open')) {
            hamburger.classList.remove('open');
            sidebar.classList.remove('open');
        } else {
            hamburger.classList.add('open');
            sidebar.classList.add('open');
        }
    });
}


function renderHome(todoArray) {

}

function renderQuestlines(todoArray) {
    clear(mainDiv);
    mainDiv.appendChild(buildAddButton());
    //questlines
    for(let i = 0; i < todoArray.length; i++) {
        const questline = buildQuestlineCard(todoArray[i]);
        questline.dataset.todoIndex = i;
        mainDiv.appendChild(questline);
    }
}

function renderSettings() {

}

//helper functions

function clear(div) {
    div.innerHTML = '';
}

//__NEED TO ADD DATA VALUES LATER__

//builds questline divs
function buildQuestlineCard(questlineObj) {
    //create elements
    const container = buildElementClass('div', 'questline-container');
    const topContainer = buildElementClass('div', 'questline-top');
    const bottomContainer = buildElementClass('div', 'questline-bottom');

    const title = buildElement('h3');
    title.textContent = `${questlineObj.getTitle()}`;
    const buttons = buildElementClass('div', 'buttons');

    const openBtn = buildElementClass('button', 'questline-open-btn');
    openBtn.textContent = 'OPEN';
    const kebabIcon = buildElementClass('img', 'kebab-menu');
    kebabIcon.src = kebabImg;
    const kebabContainer = buildElementClass('div', 'kebab-container');

    const moveBtn = buildElementClass('button', 'move-btn');
    moveBtn.textContent = 'MOVE TO TOP';
    const editBtn = buildElementClass('button', 'edit-btn');
    editBtn.textContent = 'EDIT';
    const deleteBtn = buildElementClass('button', 'delete-btn');
    deleteBtn.textContent = 'DELETE';

    const description = buildElementClass('p', 'description')
    description.textContent = `${questlineObj.getDescription()}`;
    const progressContainer = buildElementClass('div', 'questline-progress-container');

    const p = buildElement('p');
    p.textContent = 'PROGRESS';
    const progress = buildElementClass('div', 'progress-bar');
    const progressFill = buildElementClass('div', 'progress-fill');
    progressFill.style.width = '50%'; //temporary
    const progressText = buildElementClass('span', 'progress-text');
    progressText.textContent = `${questlineObj.getCount()} / `;

    //append stuff
    container.append(topContainer, bottomContainer);
    topContainer.append(title, buttons);
    bottomContainer.append(description, progressContainer);
    buttons.append(openBtn, kebabIcon, kebabContainer);
    progressContainer.append(p, progress);
    kebabContainer.append(moveBtn, editBtn, deleteBtn);
    progress.append(progressFill, progressText);

    return container;
}

//builds element with classes
function buildElementClass(type, ...classes) {
    const elem = document.createElement(type);
    elem.classList.add(...classes);
    return elem;
}
//build element
function buildElement(type) {
    return document.createElement(type);
}
//builds add button
function buildAddButton() {
    const div = document.createElement('button');
    div.classList.add('add-btn', 'questline');
    div.textContent = '+ NEW QUESTLINE';
    return div;
}
//builds tier line separator
function buildLine() {

}


export {loadStaticElements, renderHome, renderQuestlines, renderSettings};