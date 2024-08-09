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
        hamburger.classList.toggle('open');
        sidebar.classList.toggle('open');
    });
}


function renderHome(todoArray) {

}

function renderQuestlines(todoArray) {
    clear(mainDiv);
    mainDiv.appendChild(buildQuestlineAddButton());
    //questlines
    for(let i = 0; i < todoArray.length; i++) {
        const questline = buildQuestlineCard(todoArray[i]);
        questline.dataset.todoIndex = i;
        mainDiv.appendChild(questline);
    }
}

function renderQuestlineQuests(todoObj, index) {
    const questline = todoObj.atQuestline(index);

    clear(mainDiv);
    const title = buildElement('h2');
    title.textContent = questline.getTitle();
    const description = buildElementClass('p', 'description');
    description.textContent = questline.getDescription();
    mainDiv.append(buildLine(), title, description, buildLine());

    for(let tier = 0; tier < questline.getNumberOfTiers(); tier++) { 
        //build add button before
        const add = buildQuestAddButton();
        add.dataset.todoIndex = index;
        add.dataset.todoTier = tier;
        mainDiv.appendChild(add);

        for(let i = 0; i < questline.tierSize(tier); i++) {
            const card = buildQuestCard(questline.atTierIndex(tier, i));
            card.dataset.todoIndex = index;
            card.dataset.todoTier = tier;
            card.dataset.todoSpecificIndex = i;
            mainDiv.appendChild(card);
        }
        //line after
        mainDiv.appendChild(buildLine());
    }

    
}

function renderSettings() {

}

//helper functions

function clear(div) {
    div.innerHTML = '';
}

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

//need to add checked data value for checkbox
function buildQuestCard(questObj) {
    const container = buildElementClass('div', 'quest-container');
    const color = buildElementClass('div', 'quest-color');
    const content = buildElementClass('div', 'quest-main');

    if(questObj.getStatus() === true) {
        container.classList.add('done');
    }

    const leftContainer = buildElementClass('div', 'quest-left');
    const rightContainer = buildElementClass('div', 'quest-right');

    const check = buildElementClass('span', 'checkbox');
    const textContainer = buildElementClass('div', 'quest-text');

    const title = buildElement('h3');
    title.textContent = questObj.getTitle();
    const description = buildElementClass('p', 'description');
    description.textContent = questObj.getDescription();

    const detailButton = buildElementClass('button', 'quest-details');
    detailButton.textContent = 'DETAILS';
    const kebabIcon = buildElementClass('img', 'kebab-menu');
    kebabIcon.src = kebabImg;
    const kebabContainer = buildElementClass('div', 'kebab-container');

    const moveUpButton = buildElementClass('button', 'move-up-btn');
    moveUpButton.textContent = 'MOVE UP';
    const moveDownButton = buildElementClass('button', 'move-down-btn');
    moveDownButton.textContent = 'MOVE DOWN';
    const editButton = buildElementClass('button', 'edit-btn');
    editButton.textContent = 'EDIT';
    const deleteButton = buildElementClass('button', 'delete-btn');
    deleteButton.textContent = 'DELETE';

    container.append(color, content);
    content.append(leftContainer, rightContainer);
    leftContainer.append(check, textContainer);
    rightContainer.append(detailButton, kebabIcon, kebabContainer);
    textContainer.append(title, description);
    kebabContainer.append(moveUpButton, moveDownButton, editButton, deleteButton);

    return container;
}

//builds add button
function buildQuestAddButton() {
    const button = buildElementClass('button', 'quest-add-btn');
    button.textContent = '+ NEW QUEST';
    return button;
}
function buildQuestlineAddButton() {
    const button = buildElementClass('button', 'questline-add-btn');
    button.textContent = '+ NEW QUESTLINE';
    return button;
}
//builds tier line separator
function buildLine() {
    const span = buildElementClass('span', 'line');
    return span;
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

// Misc. stuff
function toggleKebabMenu(target) {
    closeKebabMenu(target);
    //toggle it
    target.nextElementSibling.classList.toggle('open');
}
function closeKebabMenu(target = false) {
    const all = document.querySelectorAll('.kebab-container');

    // Close all open kebab menus except the one being toggled
    if(target === false) {
        all.forEach(menu => {
            if(menu.classList.contains('open')) {
                menu.classList.remove('open');
            }
        });
        return;
    }

    all.forEach(menu => {
      if (menu !== target.nextElementSibling) {
        menu.classList.remove('open');
      }
    });
}

function parentUp(target, count) {
    let i = 0;
    while(i != count) {
        target = target.parentNode;
        i++;
    }
    return target;
}
function findParent(target, className) {
    let current = target;
    while(current) {
        if(current.classList.contains(className)) {
            return current;
        }
        current = current.parentNode;
    }
    return null;
}

export {loadStaticElements, 
    renderHome, 
    renderQuestlines, 
    renderSettings, 
    renderQuestlineQuests,
    toggleKebabMenu, 
    closeKebabMenu,
    parentUp, 
    findParent};