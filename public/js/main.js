const deletePostButton = document.querySelectorAll('.deletePost')
const deleteCommentButton = document.querySelectorAll('.deleteComment')
const editButton = document.querySelectorAll('.editButton')

 
Array.from(deletePostButton).forEach((post)=>{
    post.addEventListener('click', deletePost)
})

Array.from(deleteCommentButton).forEach(comment => {
    comment.addEventListener('click', deleteComment)
})

Array.from(editButton).forEach((post)=>{
    post.addEventListener('click', editPost)
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

