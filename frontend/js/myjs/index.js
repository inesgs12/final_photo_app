// document.addEventListener("DOMContentLoaded", init)

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
    individualDiv.className = "container"
    // let individualDiv = document.createElement("div")
    // individualDiv.id = `photoDiv-${photo.id}`
    let photoUrlTag = document.createElement("a")
    // photoUrlTag.className = "align-middle"
    let imageThumbnail = document.createElement("img")
    imageThumbnail.className = "rounded mx-auto d-block"
    imageThumbnail.alt = "Responsive image"

    photoUrlTag.href = `${photo.url}`
    imageThumbnail.src = `${photo.url}`
    
    let likeSpan = document.createElement("span")
    likeSpan.id = "likes"
    
    let likesButton = document.createElement("button")
    likesButton.className = "fas fa-heart fa-2x rounded mx-auto d-block my-2"
    likesButton.id = "like_button"

    likesButton.innerText = ` ${photo.like_count}`

        likesButton.addEventListener('click', function(event) {
            event.preventDefault()
            createLike(photo, likesButton)
        })
   
    photoUrlTag.append(imageThumbnail)
    individualDiv.append(photoUrlTag, likeSpan, likesButton)
    
    
    let commentsUl = document.createElement("ul");
    commentsUl.id = "comments-list"
    commentsUl.innerHTML = `${photo.comments.map(comment =>` <li class=“comments” data-id=${comment.id} ><strong>${comment.content}</strong><button type="button" class="btn">Delete</button></li>`).join('')}` 
    

    photoUrlTag.append(imageThumbnail)
    individualDiv.append(photoUrlTag, commentsUl)
    portfolio.append(individualDiv)

    createForm(individualDiv, photo)

    //displayComments(photo.comments)


}

function createLike(photo, likesButton) {
    
    console.log("create like function is being called")
    photo.like_count++
    likesButton.innerText = photo.like_count

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

function createForm(individualDiv, photo) {
    
    photoCommentsForm = document.createElement("form")
    photoCommentsForm.id = "photo-form";
    photoCommentsForm.className = "container"
    // photoCommentsForm.id = `form-${individualDiv.id}`;
    photoCommentsForm.addEventListener("submit", () => addFormListener(event, individualDiv, photo))

    inputCommentContent = document.createElement("input");
    // inputCommentContent.id = `content-${individualDiv.id}`
    inputCommentContent.placeholder = "add your comment here..."
    inputCommentContent.className = "rounded mx-auto d-block my-1"

    formButton = document.createElement("button")
    formButton.id = "form-button"
    // formButton.id = `submit-${individualDiv.id}`
    formButton.innerText = "Submit"
    formButton.className = "rounded mx-auto d-block mb-5"


    photoCommentsForm.append(inputCommentContent, formButton)
    individualDiv.append(photoCommentsForm)

}
    

function addFormListener(event, individualDiv, photo){
    event.preventDefault()

    addCommentOnServer(individualDiv, photo.id)
       .then(function(resp){
            addCommentOnDom(resp);});

           photoCommentsForm.reset();
     
}


function addCommentOnServer(individualDiv, photoId){

    let commentInput = document.querySelector(`#content-${individualDiv.id}`)
    let commentValue = commentInput.value  

      const options={
          method: "POST",
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({user_id: 1, photo_id: photoId, content:commentValue})
      };
      return fetch("http://localhost:3000/comments"
      , options)
               .then(resp => resp.json());

  }

function addCommentOnDom(response){
  
 let commentsSection = document.querySelector(`#comments-${response.photo_id}`)
 let newComment = document.createElement('li')
 newComment.innerHTML = `${response.content}`
 let deleteBTN = document.createElement('button')
 deleteBTN.type = "button"
 deleteBTN.className = "btn"
 deleteBTN.innerHTML = `Delete`
//  deleteBTN.addEventListener("delete", ()=>)
 newComment.append(deleteBTN)


 commentsSection.append(newComment)
    
}
   

    

  
 

// function init() {
//     fetchPhotos()
//     addFormListener();
// }


fetchPhotos()
