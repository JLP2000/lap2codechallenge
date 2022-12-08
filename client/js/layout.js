
window.addEventListener("hashchange", updateContent);

function updateContent() {
    let hash = window.location.hash.substring(1);
    updateMain(hash);
};
const main = document.querySelector("main");
function updateMain(hash){
    updateMain.innerHTML = "";
    if(hash) {
        renderPost(hash);
    }
    else{
        renderPostForm();
    }

    async function renderPostForm() {
        main.innerHTML = "";
        main.innerHTML = `
        <div class="container">
            <h1 class="show" id="showTitle">Title</h1>
            <h1 class="formInput" id="formTitle" contenteditable="true" data-label ="Title" placeholder="Title"></h1>
            <p class="show" id="showAuthor">Author</p>
            <p class="formInput" id="formAuthor" contenteditable="true" placeholder="Your name"></p>
            <div class="show" id="showIcons">
                <img src="./images/embed-code-icon.svg" alt="">
                <img src="./images/camera.svg" alt="">
            </div>
            <p class="formInput" id="formContent" contenteditable="true" placeholder="Your story..."></p>
        </div>
        <button class="publishButton">PUBLISH</button>`;
    }

    async function renderPost(title){

        const postData = await fetch(`http://localhost:3000/posts/${title}`).then(res => res.json());
        // const postData = response.then(res => res.json());
        console.log(postData);


        main.innerHTML = "";
        main.innerHTML = `
        <div>
            <h1 id="postTitle">${postData.title}</h1>
            <p id="authorAndTime">${postData.author}</p>
            <p id="postContent">${postData.body}</p>
        </div>
        <button class="publishButton">EDIT</button>`
    }

}