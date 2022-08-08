const deleteButton = document.querySelectorAll('.deleteButton')
 
Array.from(deleteButton).forEach((el)=>{
    el.addEventListener('click', deletePost)
})

async function deletePost(){
    const postID = this.getAttribute('data-id') 
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