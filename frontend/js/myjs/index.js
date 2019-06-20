document.addEventListener("DOMContentLoaded", init)

const photosUrl = "http://localhost:3000/photos/";
const commentsUrl = "http://localhost:3000/comments/";
const portfolio = document.querySelector("#portfolio")




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
    // debugger
    let individualDiv = document.createElement("div")
    individualDiv.className = "container text-center"
    individualDiv.id = `photo-main-div-${photo.id}`

    let photoUrlTag = document.createElement("a")

    let imageThumbnail = document.createElement("img")
    imageThumbnail.className = "rounded mx-auto d-block"
    imageThumbnail.alt = "Responsive image"

    photoUrlTag.href = `${photo.url}`
    imageThumbnail.src = `${photo.url}`
    
    let likeSpan = document.createElement("span")
    likeSpan.id = "likes"

    let commentUl = document.createElement("ul")
    commentUl.id = `photo-ul-${photo.id}`
    commentUl.className = "text-center"
    commentUl.style.listStyle = "none"

    
    let likesButton = document.createElement("button")
    likesButton.className = "fas fa-heart fa-2x rounded mx-auto d-block my-2 border-0"
    likesButton.id = "like_button"
    likesButton.style.color = "#f4623a"

    likesButton.innerText = `  ${photo.like_count}`

        likesButton.addEventListener('click', function(event) {
            event.preventDefault()
            createLike(photo, likesButton)
        })
   
    photoUrlTag.append(imageThumbnail)
    individualDiv.append(photoUrlTag, likeSpan, likesButton, commentUl)
    
    portfolio.append(individualDiv)

    createForm(individualDiv, photo, commentUl)
    displayComments(commentUl, photo.id, photo.comments)

}

function createLike(photo, likesButton) {
    
    console.log("create like function is being called")
    photo.like_count++
    likesButton.innerText = `  ${photo.like_count}`

    return fetch (photosUrl + photo.id, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            like_count: `  ${photo.like_count}`, 
        })
    })
}

function createForm(individualDiv, photo, commentUl) {
    
    photoCommentsForm = document.createElement("form")
    photoCommentsForm.id = `photo-form-${photo.id}`;
    photoCommentsForm.className = "container"  

    inputCommentContent = document.createElement("input")
    inputCommentContent.id = `comment-content-${photo.id}`
    inputCommentContent.placeholder = "add your comment..."
    inputCommentContent.className = "rounded mx-auto d-block my-1 input-group-text"

    formButton = document.createElement("button")
    formButton.innerText = "Submit"
    formButton.className = "rounded mx-auto d-block mb-5"


    photoCommentsForm.append(inputCommentContent, formButton)
    individualDiv.append(photoCommentsForm)

    photoCommentsForm.reset();
    createCommentEventListener(photo, commentUl)
}

function createCommentEventListener(photo, commentUl) {
    // debugger
    let commentText = document.querySelector(`#comment-content-${photo.id}`)
    
    photoCommentsForm.addEventListener('submit', function(event) {
        event.preventDefault()

        let newComment = {
            content: commentText.value, 
            photo_id: photo.id,
            user_id: photo.id
        }

        createComment(newComment)
            .then(data => data.json())
            .then(comment => displayComment(commentUl, photo.id, comment))

        
        event.target.reset()

    })
}

function createComment(newComment) {
    
    if (newComment.content.length < 1){
        alert("Please enter your comment!")
    }
    else {
    return fetch(commentsUrl, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newComment)
    })
    }
}

function displayComments(commentUl, photoId, photoComments) {
    photoComments.forEach(comment => {
        displayComment(commentUl, photoId, comment)
    })
}

function displayComment(commentUl, photoId, comment) {
    console.log("displayComment is called when I cliks submit")
    let commentLi = document.createElement("li")
    let commentP = document.createElement("p")
    let commentInputTag = document.createElement("input")
    commentInputTag.style.display = "none"
    commentP.style.display = "inline-block"
    commentInputTag.className = "my-2"

    commentLi.id = `comment-text-${comment.id}`
    commentLi.className = "text-center"
    
    let deleteBtn = document.createElement("button")
    deleteBtn.className = "btn-secondary btn-sm rounded"
    deleteBtn.innerText = "Delete"
    deleteBtn.style.display = "inline-block"

    deleteBtn.addEventListener('click', function(event) {
        event.preventDefault()
        commentLi.remove()
        deleteComment(comment.id)
    })

    let editBtn = document.createElement("button")
    editBtn.className = "btn-info btn-sm mx-1 rounded"
    editBtn.innerText = "Edit"
    editBtn.style.display = "inline-block"

    let saveBtn = document.createElement("button")
    saveBtn.innerText = "Save"
    saveBtn.style.display = "none"
    saveBtn.className = "btn-success btn-sm rounded mx-1"

    editBtn.addEventListener('click', function(event) {
        event.preventDefault()
        editBtn.style.display = "none"
        saveBtn.style.display = "inline-block"
        commentP.style.display = "none"
        commentInputTag.style.display = "inline-block"
        commentInputTag.value = comment.content
        // editComment(comment, commentLi, photoId)
    })

    saveBtn.addEventListener('click', function(event) {
        event.preventDefault()
        saveComment(commentInputTag.value, photoId, comment.id)
        .then(data => {
            editBtn.style.display = "inline-block"
            saveBtn.style.display = "none"
            commentP.style.display = "inline-block"
            commentInputTag.style.display = "none"
            commentP.innerText = commentInputTag.value
        })
    })

    
    commentP.innerText = comment.content
    // commentUl = document.querySelector(`#photo-ul-${photo.id}`)
    commentLi.append(commentP, commentInputTag, editBtn, saveBtn, deleteBtn);

    commentUl.append(commentLi)
}

function deleteComment(commentId) {
    return fetch (commentsUrl + commentId, {
        method: "DELETE"
    })
}

function saveComment(commentValue, photoId, commentId) {
    //Populate the form with the original input 
   
    let currentComment = {
        content: commentValue,
        photo_id: photoId,
        user_id: photoId
    }
    if (commentValue.length < 1){
        alert("Please enter your comment!")
    }
    else {
    return fetch(commentsUrl + commentId, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(currentComment)
    })
    .then( resp => resp.json())
    }
}


function init() {
    fetchPhotos()
}
