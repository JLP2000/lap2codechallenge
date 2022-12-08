const formTitle = document.getElementById("formTitle");
const formAuthor = document.getElementById("formAuthor");
const formContent = document.getElementById("formContent");

const icons = document.getElementById("showIcons");
const showTitle = document.getElementById("showTitle");
const showAuthor = document.getElementById("showAuthor");

const publishButton = document.getElementById("publishButton");

publishButton.addEventListener("click", postData);
formTitle.addEventListener("keyup", showHidden);
formAuthor.addEventListener("keyup", showHidden);
formContent.addEventListener("click", showHiddenIcons);

document.addEventListener("click", hideIcons);

async function postData(){
    const newData = {
        title: formTitle.textContent,
        author: formAuthor.textContent,
        body: formContent.textContent,
        time: Date.now()
    };

    console.log(JSON.stringify(newData));

    const options = {
        method: "POST",
        body: JSON.stringify(newData),
        headers: { "Content-Type": "application/json" },
    };

    const response = await fetch('http://localhost:3000/posts', options)
    .then(r => r.json())
    .then(data =>{
        // data.title = newData.title;
        // data.author = newData.author;
        // data.body = newData.body;
        window.location.hash = `${data.title}`;
    })

}

function showHidden(){

    if(this.textContent.length > 0){
        this.previousElementSibling.style.visibility = "visible";
    }
    else{
        this.previousElementSibling.style.visibility = "hidden";
    }
}

function showHiddenIcons(){
    icons.style.visibility = "visible";
    showTitle.style.visibility = "hidden";
    showAuthor.style.visibility = "hidden";
}

function hideIcons(e){
    if(e.target == formContent){ return }
    icons.style.visibility = "hidden";
    if(e.target != formAuthor && e.target != formTitle){return}
    if(formAuthor.textContent.length > 0){
        showAuthor.style.visibility = "visible";
    }
    if(formTitle.textContent.length > 0){
        showTitle.style.visibility = "visible";
    }
}

