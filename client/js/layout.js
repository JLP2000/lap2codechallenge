window.addEventListener("hashchange", updateContent);

function updateContent() {
    let hash = window.location.hash.substring(1);
    updateMain(hash);
};
const main = document.querySelector("main");
function updateMain(hash){
    updateMain.innerHTML = "";
    if(hash) {
        renderPost(id);
    }
    else{
        renderPostForm();
    }

    async function renderPostForm() {

    }

}