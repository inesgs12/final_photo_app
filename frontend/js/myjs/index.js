document.addEventListener("DOMContentLoaded", init)

const photosUrl = "http://localhost:3000/photos"

const photosContainer = document.querySelector(".row no-gutters")

function fetchPhotos() {
    return fetch(photosUrl, { mode: 'no-cors' })
        .then(response => response.json())
        .then(photoArray => renderPhotos(photoArray))
}

function renderPhotos(photoArray) {
    photosContainer.innerHTML = ""
    photoArray.forEach(photo => {
        renderPhotos(photo)
    })
}

function renderPhoto(photo) {
    let individualDiv = document.createElement("div")
    individualDiv.className = "col-lg-4 col-sm-6"

    let photoUrlTag = document.createElement("a")
    photoUrlTag.className = "portfolio-box"
    photoUrlTag.href = `${photo.url}`
    
    let imageThumbnail = document.createElement("img")
    imageThumbnail.className = "img-fluid"
    imageThumbnail.src = `${photo.url}`
    imageThumbnail.alt = `${photo.thumbnail}`

    let captionDivBox = document.createElement("div")
    captionDivBox.className = "portfolio-box-caption"

    let photoLikeDiv = document.createElement("div")
    photoLikeDiv.className = "project-name"
    photoLikeDiv.innerText = "See Photo"


    captionDivBox.append(photoLikeDiv)
    photoUrlTag.append(captionDivBox, imageThumbnail)
    individualDiv.append(photoUrlTag)
    photosContainer.append(individualDiv)

    imageThumbnail.addEventListener('click', function(event) {
        event.preventDefault();
        displayPhotoEvent(photo.id)
    })
}

function displayPhotoEvent(photoId) {
    return fetch (photosUrl + photoId) 
        .then(response => response.json())
        // .then(photoPage => displaySinglePhoto(photoPage))
        // we need to create a show page. 
}

// function displayPhoto(photo) {
//     //photo large 
//     // like button 
//     // comment form
//     // display comments
// }

// function displayComments(photoId) {

// } 

// function likePhoto(photo) {
//     PATCH Method ... 
//     then json 
//     then displayPhoto(photo)
// }


function init() {
    fetchPhotos()
    // displayPhotoEvent(photoId)
}




// Comment Code 

// const photoForm = document.querySelector(".row no-gutters");

// const addBtn = document.querySelector("#new-comment-btn");

// const editBtn = document.querySelector("#edit-comment-btn");

// const deleteBtn = document.querySelector("#delete-btn");

// const addCommentForm = document.querySelector(".add-comment-form");

// // const likeBtn = 



// function addCommentOnDom(comment){

//     const commentDiv = document.createElement("div");
//     commentDiv.className = "card";
//     addBtn.innerText = "create new comment";
//     editBtn.innerText = "edit comment";
//     deleteBtn.innerText = "delete comment";
   
//     comment.innerHTML = `
    
//        <h3>{$comment.content}</h3>
//        <p class="addBtn">Add Comment</p>
//        <p class="editBtn">Edit Comment</p>
//        <p class="deleteBtn">Delete Comment</p>

//     `

//     photoForm.append(commentDiv);

//     deleteBtn.dataset.id = comment.id

//     deleteBtn.addEventListener("click", deleteComment=>{
//      commentDiv.append(deleteBtn);
//     })
// }
