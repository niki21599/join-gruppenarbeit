function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        elmnt.innerHTML = this.responseText;
                    }
                    if (this.status == 404) {
                        elmnt.innerHTML = "Page not found.";
                    }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
    changeActiveSection();
}

setURL("http://gruppe-143.developerakademie.net/smallest_backend_ever");

// KOmmunikation mit dem Server  ==> Funktionen aus Github von Junus
let tasks = [];


// analog zu init
async function loadTasksFromServer() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];

}
// analog zu save
async function addTaskToServer(task) {
    console.log(tasks);
    tasks.push(task);
    await backend.setItem('tasks', JSON.stringify(tasks));
    console.log(tasks);

}

async function saveToServer() {
    await backend.setItem('tasks', JSON.stringify(tasks));
}

function deleteTask() {
    backend.deleteItem('tasks');
}