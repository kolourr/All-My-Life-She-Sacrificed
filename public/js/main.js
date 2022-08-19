const deletePostButton = document.querySelectorAll('.deletePost')
const deleteCommentButton = document.querySelectorAll('.deleteComment')
const postHeartDecrease = document.querySelectorAll('button.decrease')
const postHeartIncrease = document.querySelectorAll('button.increase')

 
 
Array.from(deletePostButton).forEach((post)=>{
    post.addEventListener('click', deletePost)
})

Array.from(deleteCommentButton).forEach(comment => {
    comment.addEventListener('click', deleteComment)
})

Array.from(postHeartDecrease).forEach(heart => {
    heart.addEventListener('click', decreasePostHeart)
})

Array.from(postHeartIncrease).forEach(heart => {
    heart.addEventListener('click', increasePostHeart)
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


async function decreasePostHeart(){
    const postHeartID = this.getAttribute('data-PostHeartID') 
    try{
        const response = await fetch('post/postHeartDecrease', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'decreasePostHeartID': postHeartID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }

}



async function increasePostHeart(){
    const postHeartID = this.getAttribute('data-PostHeartID') 
    try{
        const response = await fetch('post/postHeartIncrease', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'increasePostHeartID': postHeartID
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }

}
