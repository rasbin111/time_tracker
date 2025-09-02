
document.addEventListener("DOMContentLoaded", async () => {
    const userDiv = document.getElementById("users-div")
    let names = users.getNames()
    let nameString = names.join("<br/>")
    userDiv.innerHTML = nameString
})