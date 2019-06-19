// document.addEventListener("DOMContentLoaded", init)

const photosUrl = "http://localhost:3000/photos/"
const fluidPhotoContainer = document.querySelector(".mfp-container")
const portfolio = document.querySelector("#portfolio")


// const photosContainer = document.querySelector("#photo-container")

function fetchPhotos() {
    return fetch(photosUrl)
        .then(response => response.json())
        .then(photoArray => renderPhotos(photoArray))
}

function renderPhotos(photoArray) {
    // debugger
    // photosContainer.innerHTML = ""
    photoArray.forEach(photo => {
        renderPhoto(photo)
    })
}

function renderPhoto(photo) {
    
    
    let individualDiv = document.createElement("div")
    individualDiv.id = `photoDiv-${photo.id}`
    let photoUrlTag = document.createElement("a")
    let imageThumbnail = document.createElement("img")
   
    photoUrlTag.href = `${photo.url}`
    imageThumbnail.src = `${photo.url}`

    let commentsUl = document.createElement("ul");
    commentsUl.id = `comments-${photo.id}`
    debugger
    // commentsUl.innerHTML = `${photo.comments.map(comment =>` <li class=“comments” data-id=${comment.id} ><strong>${comment.content}</strong><button type="button" class="btn">Delete</button></li>`).join('')}` 
    
   
    photoUrlTag.append(imageThumbnail)
    individualDiv.append(photoUrlTag)
    individualDiv.append(commentsUl);
    portfolio.append(individualDiv)



    createForm(individualDiv, photo)

    // imageThumbnail.className = "img-fluid"
    // imageThumbnail.src = `${photo.thumbnail}`
    // individualDiv.className = "col-lg-4 col-sm-6"
    // photoUrlTag.className = "portfolio-box"
    // let captionDivBox = document.createElement("div")
    // captionDivBox.className = "portfolio-box-caption"
    // let photoLikeDiv = document.createElement("div")
    // photoLikeDiv.className = "project-name"
    // photoLikeDiv.innerText = "See Photo"

}

function createForm(individualDiv, photo) {
    
    photoCommentsForm = document.createElement("form")
    photoCommentsForm.id = `form-${individualDiv.id}`;
    photoCommentsForm.addEventListener("submit", () => addFormListener(event, individualDiv, photo))

    inputCommentContent = document.createElement("input");
    inputCommentContent.id = `content-${individualDiv.id}`
    inputCommentContent.placeholder = "add your comment here..."

    formButton = document.createElement("button")
    formButton.id = `submit-${individualDiv.id}`
    formButton.innerText = "Submit"


    photoCommentsForm.append(inputCommentContent, formButton)
    individualDiv.append(photoCommentsForm)

}
    

function addFormListener(event, individualDiv, photo){
    event.preventDefault()
    
    addCommentOnServer(individualDiv, photo)
       .then(function(resp){
            addCommentOnDom(resp);});

           photoCommentsForm.reset();
     
}


function addCommentOnServer(individualDiv, photo){
    

    let commentInput = document.querySelector(`#content-${individualDiv.id}`)
    let commentValue = commentInput.value  
      

      const options={
          method: "POST",
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({user_id: photo.id, photo_id: photo.id, content:commentValue})
      };
      return fetch("http://localhost:3000/comments"
      , options)
               .then(resp => resp.json());

  }

function addCommentOnDom(response){
 let commentsSection = document.querySelector(`#comments-${response.photo_id}`)
 let newComment = document.createElement('li');
 newComment.innerHTML = `${response.content}`;
 let deleteBTN = document.createElement('button');
 deleteBTN.type = "button";
 deleteBTN.className = "btn";
 deleteBTN.innerHTML = `Delete`;
 deleteBTN.addEventListener("click", () => deleteCommentOnServer(event, response));
 newComment.append(deleteBTN);
 commentsSection.append(newComment)
 photoCommentsForm.reset();
 
}

function deleteCommentOnDom(id){
    
    const commentElement= document.getElementById(id);
    commentElement.remove();

}

function deleteCommentOnServer(event, response){
    console.log('resp',response)

    const  commentId = parseInt(event.target.parentElement.id)
    const options={
        method:"DELETE"
    };
    return fetch(`${commentsUrl} ${commentId}`,options)
             .then(function(){deleteCommentOnDom(event.target.parentElement.id)});

}

   

    

  
 

// function init() {
//     fetchPhotos()
//     addFormListener();
// }


fetchPhotos()
