//for questline modals
const questlineModal = document.querySelector('#questline-dialog'); //for opening/closing modal
const questlineTitle = document.getElementById('questline-form-title');
const questlineDescription = document.getElementById('questline-form-description');
const questlineColor = document.getElementById('questline-form-color');

function showQuestlineModal(title = '', description = '', color = '') {
    questlineTitle.value = title;
    questlineDescription.value = description;
    questlineColor.value = color;
    questlineModal.showModal();
}
function closeQuestlineModal() {
    //reset values first
    questlineTitle.value = '';
    questlineDescription.value = '';
    questlineColor.value = '#000000';
    questlineModal.close();
}
function getQuestlineModal() {
    const title = questlineTitle.value;
    const description = questlineDescription.value;
    const color = questlineColor.value;
    return {title, description, color};
}

//for quest modals
const questModal = document.querySelector('#quest-dialog'); //for opening/closing modal
const questTitle = document.getElementById('quest-form-title');
const questDescription = document.getElementById('quest-form-description');

function showQuestModal(title = '', description = '', color = '') {
    questTitle.value = title;
    questDescription.value = description;
    questModal.showModal();
}
function closeQuestModal() {
    //reset values first
    questTitle.value = '';
    questDescription.value = '';
    questModal.close();
}
function getQuestModal() {
    const title = questTitle.value;
    const description = questDescription.value;
    return {title, description};
}

export {showQuestlineModal,
    closeQuestlineModal,
    getQuestlineModal,
    showQuestModal,
    closeQuestModal,
    getQuestModal}