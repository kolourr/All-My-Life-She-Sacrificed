const deletePostButton = document.querySelectorAll('.deletePost')
const deleteCommentButton = document.querySelectorAll('.deleteComment')
const heartIncreaseDecrease = document.querySelectorAll('.heartIncreaseDecrease')
const heartBreakIncreaseDecrease = document.querySelectorAll('.heartBreakIncreaseDecrease')
const heartIncreaseDecreaseComment = document.querySelectorAll('.heartIncreaseDecreaseComment')
const heartBreakIncreaseDecreaseComment = document.querySelectorAll('.heartBreakIncreaseDecreaseComment')
 
 
Array.from(deletePostButton).forEach((post)=>{
    post.addEventListener('click', deletePost)
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

 