let selectetPositions = [];
let category = ['Management', 'Marketing', 'Vertrieb', 'Buchhaltung'];
let urgency = ['Sehr Hoch', 'Hoch', 'Normal', 'Hat Zeit'];

/**
 * 
 * Collection of functions wich are initiated onload
 */
async function init() {
    defineCategory();
    defineUrgency();

    loadTasksFromServer()

}

/**
 * 
 * Function for dropdown menu Category
 */
function defineCategory() {
    document.getElementById('category').innerHTML = '';
    for (let i = 0; i < category.length; i++) {
        const cat = category[i];
        document.getElementById('category').innerHTML += `
        <option value="${cat}">
        `;
    };
}

/**
 * 
 * Function for dropdown menu Urgency
 */
function defineUrgency() {
    document.getElementById('urgency').innerHTML = '';
    for (let i = 0; i < urgency.length; i++) {
        const urge = urgency[i];
        document.getElementById('urgency').innerHTML += `
        <option value="${urge}">
        `;
    };
}

/**
 * 
 * saves new task in JSON array onsubmit
 */
function createTask() {

    allTasks.push({
        id: new Date().getTime(),
        title: document.getElementById('title').value,
        category: document.getElementById('input-cat').value,
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        urgency: document.getElementById('input-urge').value,
        status: `toDo`,
        assignedTo: selectetPositions,
    }, );
    backend.setItem('allTasks', JSON.stringify(allTasks));
    deleteInputFields();
    selectetPositions = [];
    alert('Die Aufgabe wurde erfolgreich gespeichert!');
}

/**
 * 
 * clears the form
 */
function deleteInputFields() {
    document.getElementById('title').value = '';
    document.getElementById('input-cat').value = '';
    document.getElementById('description').value = '';
    document.getElementById('date').value = '';
    document.getElementById('input-urge').value = '';
    unselect();
}

/**
 * 
 * opens window to select position
 */
function showPosition() {
    document.getElementById('containerWindow').classList.remove('display-none');
    document.getElementById('window').innerHTML = '';

    for (let i = 0; i < assignedTo.length; i++) {
        document.getElementById('window').innerHTML += generateHTMLPosition(i);
    }
}

/**
 * Generates HTML Code for showPosition-function
 * @param {number} i 
 * @returns {string} - HTML code for selection of positions
 */
function generateHTMLPosition(i) {
    return `
        <div class = "containerUser" id = "${i}" onclick = "addPosition(${i})">
            <div class = "userImage">
                <img src = "${assignedTo[i]['img']}">
            </div>
            <div class = "userInfo">
                <span> ${assignedTo[i]['name']} </span>
                <span> ${assignedTo[i]['email']} </span>
            </div>
        </div>
    `;

}

/**
 * function to colse window for selecting position
 */
function hidePosition() {
    document.getElementById('containerWindow').classList.add('display-none');
}

/**
 * adds positin to task
 * @param {number} i 
 */
function addPosition(i) {
    if (selectetPositions.includes(assignedTo[i])) {
        alert('Bitte eine andere Person auswählen. Die ausgewählte Person wurde bereits hinzugefügt.');
    }

    selectetPositions.push(assignedTo[i]);
    document.getElementById(i).classList.add('selected');
    showSelection();
}

function showSelection() {
    document.getElementById('select').innerHTML = '';

    for (let i = 0; i < selectetPositions.length; i++) {
        document.getElementById('select').innerHTML += `
            <img class="addPosition" src="${selectetPositions[i]['img']}" onclick="unselect(${i})">
        `;
    }
}

function unselect(index) {
    selectetPositions.splice(index, 1);
    showSelection();
}

function addTask() {

    let id = Math.random() * 1000000;
    let title = document.getElementById("title").value;
    let section = "backlog";
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    let urgency = document.getElementById("input-urge").value;
    let user = new User();
    let category = document.getElementById("input-cat").value;
    let color = "yellow";

    let task = new Task(id, title, section, description, date, urgency, user, category);

    addTaskToServer(task);
    deleteInputFields();
    selectetPositions = [];

    return false;
}