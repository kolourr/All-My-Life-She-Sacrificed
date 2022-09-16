//Adding and removing hearts, and deleting posts/comments 


const deletePostButton = document.querySelectorAll('.deletePost')
const deleteWallPostButton = document.querySelectorAll('.deleteWallPost')
const deleteCommentButton = document.querySelectorAll('.deleteComment')
const heartIncreaseDecrease = document.querySelectorAll('.heartIncreaseDecrease')
const heartBreakIncreaseDecrease = document.querySelectorAll('.heartBreakIncreaseDecrease')
const heartIncreaseDecreaseComment = document.querySelectorAll('.heartIncreaseDecreaseComment')
const heartBreakIncreaseDecreaseComment = document.querySelectorAll('.heartBreakIncreaseDecreaseComment')

Array.from(deletePostButton).forEach((post)=>{
    post.addEventListener('click', deletePost)
})

Array.from(deleteWallPostButton).forEach((wallpost)=>{
    wallpost.addEventListener('click', deleteWallPost)
})


Array.from(deleteCommentButton).forEach(comment => {
    comment.addEventListener('click', deleteComment)
})
Array.from(heartIncreaseDecrease).forEach(heart => {
    heart.addEventListener('click', postHeartIncreaseDecrease)
})

Array.from(heartBreakIncreaseDecrease).forEach(heartBreak => {
    heartBreak.addEventListener('click', postHeartBreakIncreaseDecrease)
})

Array.from(heartIncreaseDecreaseComment).forEach(heart => {
    heart.addEventListener('click', commentHeartIncreaseDecrease)
})

Array.from(heartBreakIncreaseDecreaseComment).forEach(heartBreak => {
    heartBreak.addEventListener('click', commentHeartBreakIncreaseDecrease)
})
 

async function deletePost(){
    const postID = this.getAttribute('data-DeleteID') 
    try{
        const response = await fetch('deletePost', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'deletePostID': postID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function deleteWallPost(){
    const wallPostID = this.getAttribute('data-DeleteWallPostID') 
    try{
        const response = await fetch('/wall/deleteWallPost', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'deleteWallPostID': wallPostID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


async function deleteComment(){
    const commentID = this.getAttribute('data-DeleteCommentID') 
    try{
        const response = await fetch('../comment/deleteComment', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'deleteCommentID': commentID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}


async function postHeartIncreaseDecrease(){
    const postHeartIncreaseDecreaseID = this.getAttribute('data-PostHeartID') 
    try{
        const response = await fetch('post/postHeartIncreaseDecreaseID', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'postHeartIncreaseDecreaseID': postHeartIncreaseDecreaseID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }

}


async function postHeartBreakIncreaseDecrease(){
    const postHeartBreakIncreaseDecreaseID = this.getAttribute('data-PostHeartBreakID') 
    try{
        const response = await fetch('post/postHeartBreakIncreaseDecreaseID', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'postHeartBreakIncreaseDecreaseID': postHeartBreakIncreaseDecreaseID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }

}


async function commentHeartIncreaseDecrease(){
    const commentHeartIncreaseDecreaseID = this.getAttribute('data-CommentHeartID') 
    try{
        const response = await fetch('../comment/commentHeartIncreaseDecreaseID', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'commentHeartIncreaseDecreaseID': commentHeartIncreaseDecreaseID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }

}


async function commentHeartBreakIncreaseDecrease(){
    const commentHeartBreakIncreaseDecreaseID = this.getAttribute('data-CommentHeartBreakID') 
    try{
        const response = await fetch('../comment/commentHeartBreakIncreaseDecreaseID', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'commentHeartBreakIncreaseDecreaseID': commentHeartBreakIncreaseDecreaseID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }

}

//Cropping Profile Picture using Croppie

//initialize Croppie
 
let vanilla =  new Croppie(document.getElementById('image_demo'), {
    enableExif: true,
    showZoomer: true,
    enableOrientation: true,
    viewport: {
        width:200, 
        height:200,
        type:'circle' //circle
    },
    boundary:{
        width:300,
        height:300 
    }
})



document.getElementById('upload_image').addEventListener('change', displayImage)
//Display Image
function displayImage(){
let reader =  new FileReader();
reader.onload = function (event) {
    vanilla.bind({
    url: event.target.result
  }) 
}
reader.readAsDataURL(this.files[0]); 
document.getElementById('uploadimage').style.display = 'block' 

}

document.getElementById('crop_image').addEventListener('click', uploadBase64)
//Upload base64 of Cropped Image for Server Side rendering and upload to S3

function uploadBase64(){
vanilla.result({
    type: 'base64',
    size: 'viewport'
  }).then( function(response){
           fetch('/editProfilePicture', {
              method: 'post',
              headers: {'Content-type': 'application/json'},
              body: JSON.stringify({
                  'base64': response
              })

          })
          location.reload()

  })
}

//CamanJs and Canvas
 
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let img = new Image()

//Upload Image to Canvas 
document.getElementById('wallImage').addEventListener('change', uploadImgToCanvas)

 function uploadImgToCanvas(){
    const file =  document.getElementById('wallImage').files[0]
    const reader =  new FileReader()

    if(file){
        reader.readAsDataURL(file)
    }

    reader.addEventListener('load', () => {
        img = new Image()
        img.src = reader.result
        img.onload = function() {
            canvas.width = 1000
            canvas.height = 1000 
            ctx.drawImage(img, 0, 0, 1000, 1000)
            canvas.removeAttribute('data-caman-id')
        }

    }, false)
}

//Remove filter from image 
document.getElementById('remove-filters').addEventListener('click', removeFilter)

function removeFilter(){
    Caman("#canvas", img, function() {
        this.revert();
      });
}

//Adding various filters using Caman to the image on the Canvas 
document.addEventListener('click', e => {
    if(e.target.classList.contains('filters')){
        if(e.target.classList.contains('vintage')){
            removeFilter()
            Caman('#canvas', img, function(){
                this.vintage().render()
            })
        }
else if(e.target.classList.contains('concentrate')){
            removeFilter()
            Caman('#canvas', img, function(){
                this.concentrate().render()
            })
    }
else if(e.target.classList.contains('sinCity')){
            removeFilter()
            Caman('#canvas', img, function(){
                this.sinCity().render()
            })
    }
    else if(e.target.classList.contains('sunrise')){
        removeFilter()
        Caman('#canvas', img, function(){
            this.sunrise().render()
        })
}
else if(e.target.classList.contains('crossProcess')){
    removeFilter()
    Caman('#canvas', img, function(){
        this.crossProcess().render()
    })
}
else if(e.target.classList.contains('orangePeel')){
    removeFilter()
    Caman('#canvas', img, function(){
        this.orangePeel().render()
    })
}
else if(e.target.classList.contains('love')){
    removeFilter()
    Caman('#canvas', img, function(){
        this.love().render()
    })
}
else if(e.target.classList.contains('hemingway')){
    removeFilter()
    Caman('#canvas', img, function(){
        this.hemingway().render()
    })
}
else if(e.target.classList.contains('jarques')){
    removeFilter()
    Caman('#canvas', img, function(){
        this.jarques().render()
    })
}
else if(e.target.classList.contains('pinhole')){
    removeFilter()
    Caman('#canvas', img, function(){
        this.pinhole().render()
    })
}
else if(e.target.classList.contains('oldBoot')){
    removeFilter()
    Caman('#canvas', img, function(){
        this.oldBoot().render()
    })
}
else if(e.target.classList.contains('glowingSun')){
    removeFilter()
    Caman('#canvas', img, function(){
        this.glowingSun().render()
    })
}
else if(e.target.classList.contains('hazyDays')){
    removeFilter()
    Caman('#canvas', img, function(){
        this.hazyDays().render()
    })
}
else if(e.target.classList.contains('herMajesty')){
    removeFilter()
    Caman('#canvas', img, function(){
        this.herMajesty().render()
    })
}
else if(e.target.classList.contains('nostalgia')){
    removeFilter()
    Caman('#canvas', img, function(){
        this.nostalgia().render()
    })
}
else if(e.target.classList.contains('clarity')){
    removeFilter()
    Caman('#canvas', img, function(){
        this.clarity().render()
    })
}    
    }
})

//Send imageBase64 and caption to S3
document.getElementById('submit-wallImage').addEventListener('click', submitWallImage)

 function submitWallImage(){
    const imageBase64 = canvas.toDataURL("image/jpeg", 0.8)
    const caption = document.getElementById('caption').value 
    const fileLength = document.getElementById('wallImage').files.length

    if(caption === '' && fileLength === 0 ){
        document.getElementById("msg").innerHTML = "Caption is required!";
        document.getElementById("msgFile").innerHTML = "Please upload an image!";
    }
    
    else if(caption === '' && fileLength === 1){
        document.getElementById("msg").innerHTML = "Caption is required!";
        document.getElementById("msgFile").innerHTML = "";

    }
    else if(fileLength === 0 && caption !== ''){
        document.getElementById("msgFile").innerHTML = "Please upload an image!";
        document.getElementById("msg").innerHTML = "";
    }
    else
    {
        document.getElementById("msg").innerHTML = "";
        document.getElementById("msgFile").innerHTML = "";


     fetch('../wall/createWallPost', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'imageBase64': imageBase64,
                'caption': caption
            })
        })
        //redirecting from client after sending the 200 response
        window.location.href = "../post/dashboard"
    }
}
 