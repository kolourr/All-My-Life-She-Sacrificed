const deleteButton = document.querySelectorAll('.deleteButton')
const editButton = document.querySelectorAll('.editButton')

 
Array.from(deleteButton).forEach((post)=>{
    post.addEventListener('click', deletePost)
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
 

// async function editPost(){
//     const postID = this.getAttribute('data-editPostID') 
//     console.log(postID)
//     try{
//         const response = await fetch('editPostPage', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'editPostID': postID
//             }),
  
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }