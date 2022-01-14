function changeActiveSection() {
    if (window.location.pathname === "/board.html") {
        console.log(document.getElementById("nav-item0"));
        document.getElementById("nav-item0").classList.add("active");
        console.log(document.getElementById("nav-item0"));
    } else if (window.location.pathname === "/backlog.html") {
        console.log(document.getElementById("nav-item0"));
        document.getElementById("nav-item1").classList.add("active");
    } else if (window.location.pathname === "/addTask.html") {
        console.log(document.getElementById("nav-item0"));
        document.getElementById("nav-item2").classList.add("active");
    } else if (window.location.pathname === "/help.html") {
        console.log(document.getElementById("nav-item0"));
        document.getElementById("nav-item3").classList.add("active");
    }
}