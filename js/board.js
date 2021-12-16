let tasks = [{
        id: 0,
        title: "To do",
        category: "todo"
    },
    {
        id: 1,
        title: "To do",
        category: "inprogress"
    },
    {
        id: 2,
        title: "To do",
        category: "testing"
    },
    {
        id: 3,
        title: "To do",
        category: "done"
    }
]

let currentDraggedElement;



function updateTaskHTML(params) {
    deleteInnerHTML();
    loadTasks();
}

function loadTasks() {
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        document.getElementById(task.category).innerHTML += getTaskHTML(task);
    }

}

function getTaskHTML(task) {
    return `
    <div draggable="true" ondragstart="startDragging(${task.id})" class="card">
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

function moveTo(category) {
    tasks[currentDraggedElement].category = category
    removeHighlight(category);
    updateTaskHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add("drag-area-highlight");
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove("drag-area-highlight");
}