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

export {showQuestlineModal,
    closeQuestlineModal,
    getQuestlineModal}