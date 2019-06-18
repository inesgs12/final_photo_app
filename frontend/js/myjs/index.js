document.addEventListener("DOMContentLoaded", init)

const photosUrl = "http://localhost:3000/photos/"
const portfolio = document.querySelector("#portfolio")


// const photosContainer = document.querySelector("#photo-container")


function fetchPhotos() {
    return fetch(photosUrl)
        .then(response => response.json())
        .then(photoArray => renderPhotos(photoArray))
}

function renderPhotos(photoArray) {
    portfolio.innerHTML = ""
    photoArray.forEach(photo => {
        renderPhoto(photo)
    })
}

function renderPhoto(photo) {
    
    let individualDiv = document.createElement("div")
    let photoUrlTag = document.createElement("a")
    let imageThumbnail = document.createElement("img")

    photoUrlTag.href = `${photo.url}`
    imageThumbnail.src = `${photo.url}`
    
    let likeSpan = document.createElement("span")
    likeSpan.id = "likes"
    
    let likesButton = document.createElement("button")
    likesButton.id = "like_button"

    likesButton.innerText = "<3"
    likeSpan.innerText = `${photo.like_count}`

        likesButton.addEventListener('click', function(event) {
            event.preventDefault()
            createLike(photo, likeSpan)
        })
   

    photoUrlTag.append(imageThumbnail)
    individualDiv.append(photoUrlTag, likeSpan, likesButton)
    portfolio.append(individualDiv)

    createForm(individualDiv)

    //displayComments(photo.comments)


}

function createLike(photo, likeSpan) {
    
    console.log("create like function is being called")
    photo.like_count++
    likeSpan.innerText = photo.like_count

    return fetch (photosUrl + photo.id, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            like_count: photo.like_count, 
            // id: photo.id  
        })
    })
}

function createForm(individualDiv) {
    photoCommentsForm = document.createElement("form")
    photoCommentsForm.id = "photo-form";

    inputCommentContent = document.createElement("input");
    inputCommentContent.id = "content"
    inputCommentContent.placeholder = "add your comment here..."

    formButton = document.createElement("button")
    formButton.innerText = "Submit"

    photoCommentsForm.append(inputCommentContent, formButton)
    individualDiv.append(photoCommentsForm)

}

    
//function event Listener submit button

//function add comments to the server (POST)

// function display(render)Comments(photoId) {
// } 

//function event listener delete button comment

// function event listener edit button comment 


//function event listener to like button 

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
