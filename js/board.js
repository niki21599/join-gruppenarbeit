let tasks = [{
        id: 0,
        title: "First",
        section: "todo",
        active: true,
        description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        date: "01/12/2012",
        urgency: "Sehr Dringend",
        user: "Niklas",
        category: "Management"
    },
    {
        id: 1,
        title: "Juhu Party",
        section: "inprogress",
        active: true,
        description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        date: "11/12/2012",
        urgency: "Sehr Dringend",
        user: "Niklas",
        category: "Marketing"
    },
    {
        id: 2,
        title: "Bla bla bla",
        section: "testing",
        active: true,
        description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        date: "01/12/2012",
        urgency: "Wichtig",
        user: "Niklas",
        category: "Engineering"
    },
    {
        id: 3,
        title: "Dies das",
        section: "done",
        active: true,
        description: "Some quick example text to build on the card title and make up the bulk of the card's content.",
        date: "01/12/2012",
        urgency: " Dringend",
        user: "Niklas",
        category: "Ka"
    }
]

let currentDraggedElement;

async function loadTasksFromServer() {
    //await downloadFromServer();
    //tasks = JSON.parse(backend.getItem('tasks')) || [];
}

async function saveToServer() {
    //await backend.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskHTML() {
    loadTasksFromServer();
    deleteInnerHTML();
    loadTasks();
}

function loadTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        document.getElementById(task.section).innerHTML += getTaskHTML(task);
    }

}

function getTaskHTML(task) {
    return `
    <div onclick="openInfo(${task.id})" draggable="true" ondragstart="startDragging(${task.id})" class="card card-task">
        <div class="card-body">
            <h5 class="card-title">${task.title}</h5>
        </div>
    </div>
    `
}

function deleteInnerHTML() {
    document.getElementById("todo").innerHTML = "";
    document.getElementById("inprogress").innerHTML = "";
    document.getElementById("testing").innerHTML = "";
    document.getElementById("done").innerHTML = "";
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault()
}

function moveTo(section) {
    tasks[currentDraggedElement].section = section;
    removeHighlight(section);
    saveToServer();
    updateTaskHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove("drag-area-highlight");
}

function openInfo(id) {
    let task = tasks.find(task => task.id === id);
    document.getElementById("title").innerHTML = task.title;
    document.getElementById("due-date").innerHTML = task.date;
    document.getElementById("category").innerHTML = task.category;
    document.getElementById("urgency").innerHTML = task.urgency;
    document.getElementById("description").innerHTML = task.description;
    document.getElementById("user").innerHTML = task.user;
    document.getElementById("task-detail").classList.remove("d-none");
}

function closeInfo() {
    document.getElementById("task-detail").classList.add("d-none");
}