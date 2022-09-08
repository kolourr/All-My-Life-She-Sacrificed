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


 