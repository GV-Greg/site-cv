let data = [];
function loadFile() {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', '/../assets/projects.json', true);
    xobj.onload = () => {
        try {
            if(xobj.status === 200) {
                data.push(JSON.parse(xobj.responseText));
            }
        } catch(error) { console.error(error) }
    }
    xobj.send();
}
loadFile()
let projects;
function loadData() {
    projects = data[0]
}
setTimeout(loadData, 500)

const modalBtn = document.querySelector('.project-btn');
const modalCloseBtn = document.querySelector('.close-btn');

const modal = document.querySelector('.modal');
const modalCard = document.querySelector('.modal-card');
const modalStatut = document.getElementById('modal-statut');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalTechnos = document.getElementById('modal-technologies');
const modalActions = document.getElementById('modal-actions');

function openModal(project) {
    if(projects.hasOwnProperty(project)) {
        modalStatut.textContent = projects[project].statut;
        modalTitle.textContent = project;
        modalDescription.textContent = projects[project].description;
        for(let techno in projects[project].technologies) {
            let tag = document.createElement('div');
            let newContent = document.createTextNode(techno);
            tag.appendChild(newContent);
            tag.classList.add("card-techno");
            tag.classList.add(projects[project].technologies[techno]);
            modalTechnos.appendChild(tag);
        }
        for(let action in projects[project].actions) {
            let tag = document.createElement('a');
            // let newContent = document.createTextNode(action);
            // tag.appendChild(newContent);
            tag.href = projects[project].actions[action];
            tag.target = '_blank';
            tag.datafront = action;
            tag.databack = 'visit';
            tag.classList.add("card-action");
            let tab = action.split(' ');
            if(tab.includes('github')) {
                tag.classList.add('github');
                tag.innerHTML = '<ion-icon name="logo-github"></ion-icon>' + '<span class="action-text">' + action + '</span>';
            } else if(tab.includes('site')) {
                tag.classList.add('site');
                tag.innerHTML = '<ion-icon name="home"></ion-icon>' + '<span class="action-text">' + action + '</span>';
            }
            modalActions.appendChild(tag);
        }
        modal.style.display = 'flex';
        modalCard.style.cssText = 'top:0%; opacity:1; transform:translateY(0)';
    } else {
        alert("Pas d'info sur ce projet.")
    }

}

function closeModal() {
    let technos = document.getElementsByClassName('card-techno');
    while(technos.length > 0){
        modalTechnos.removeChild(modalTechnos.firstElementChild);
    }
    let actions = document.getElementsByClassName('card-action');
    while(actions.length > 0){
        modalActions.removeChild(modalActions.firstElementChild);
    }
    modal.style.display = 'none';
    modalCard.style.cssText = 'top:-100%; opacity:1; transform:translateY(-100%)';
}