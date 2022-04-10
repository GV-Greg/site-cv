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

function openModal(project) {
    if(projects.hasOwnProperty(project)) {
        modalStatut.textContent = projects[project].statut;
        modalTitle.textContent = project;
        modalDescription.textContent = projects[project].description;
    }
    modal.style.display = 'flex';
    modalCard.style.cssText = 'top:0%; opacity:1; transform:translateY(0)';
}

function closeModal() {
    modal.style.display = 'none';
    modalCard.style.cssText = 'top:-100%; opacity:1; transform:translateY(-100%)';
}