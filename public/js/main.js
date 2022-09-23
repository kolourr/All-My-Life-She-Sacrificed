const deletePostButton = document.querySelectorAll('.deletePost')
const deleteWallPostButton = document.querySelectorAll('.deleteWallPost')
const deleteCommentButton = document.querySelectorAll('.deleteComment')
const heartIncreaseDecrease = document.querySelectorAll('.heartIncreaseDecrease')
const heartBreakIncreaseDecrease = document.querySelectorAll('.heartBreakIncreaseDecrease')
const heartIncreaseDecreaseComment = document.querySelectorAll('.heartIncreaseDecreaseComment')
const heartBreakIncreaseDecreaseComment = document.querySelectorAll('.heartBreakIncreaseDecreaseComment')
const wallPostHeartIncreaseDecreaseButton = document.querySelectorAll('.wallPostHeartIncreaseDecrease')
const wallPostHeartBreakIncreaseDecreaseButton = document.querySelectorAll('.wallPostHeartBreakIncreaseDecrease')
const wallPostCommentHeartIncreaseDecreaseButton = document.querySelectorAll('.wallPostCommentHeartIncreaseDecrease')
const wallPostCommentHeartBreakIncreaseDecreaseButton = document.querySelectorAll('.wallPostCommentHeartBreakIncreaseDecrease')

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


Array.from(wallPostHeartIncreaseDecreaseButton).forEach((post)=>{
    post.addEventListener('click', wallPostHeartIncreaseDecrease)
})


Array.from(wallPostHeartBreakIncreaseDecreaseButton).forEach((post)=>{
    post.addEventListener('click', wallPostHeartBreakIncreaseDecrease)
})


Array.from(wallPostCommentHeartIncreaseDecreaseButton).forEach((post)=>{
    post.addEventListener('click', wallPostCommentHeartIncreaseDecrease)
})


Array.from(wallPostCommentHeartBreakIncreaseDecreaseButton).forEach((post)=>{
    post.addEventListener('click', wallPostCommentHeartBreakIncreaseDecrease)
})



async function wallPostCommentHeartBreakIncreaseDecrease(){
    const postID = this.getAttribute('data-wallPostCommentHeartBreakID') 
    try{
        const response = await fetch('../wall/wallPostCommentHeartBreakIncreaseDecreaseID', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'wallPostCommentHeartBreakIncreaseDecreaseID': postID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function wallPostCommentHeartIncreaseDecrease(){
    const postID = this.getAttribute('data-WallPostCommentHeartID') 
    try{
        const response = await fetch('../wall/wallPostCommentHeartIncreaseDecreaseID', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'wallPostCommentHeartIncreaseDecreaseID': postID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}



async function wallPostHeartIncreaseDecrease(){
    const postID = this.getAttribute('data-WallPostHeartID') 
    try{
        const response = await fetch('../wall/wallPostHeartIncreaseDecreaseID', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'wallPostHeartIncreaseDecreaseID': postID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function wallPostHeartBreakIncreaseDecrease(){
    const postID = this.getAttribute('data-wallPostHeartBreakID') 
    try{
        const response = await fetch('../wall/wallPostHeartBreakIncreaseDecreaseID', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'wallPostHeartBreakIncreaseDecreaseID': postID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

 

async function deletePost(){
    const postID = this.getAttribute('data-DeleteID') 
    try{
        const response = await fetch('../post/deletePost', {
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
        const response = await fetch('../wall/deleteWallPost', {
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
        const response = await fetch('../post/postHeartIncreaseDecreaseID', {
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
        const response = await fetch('../post/postHeartBreakIncreaseDecreaseID', {
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

