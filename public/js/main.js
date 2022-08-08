const deleteBtn = document.querySelectorAll('.deleteButton')
 
Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deletePost)
})

async function deletePost(){
    const postID = document.querySelectorAll(".deleteButton").getAttribute("data-id");

 
    try{
        const response = await fetch('post/deletePost', {
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