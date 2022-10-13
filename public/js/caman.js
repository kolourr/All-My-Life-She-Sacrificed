//Adding and removing hearts, and deleting posts/comments
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let img = new Image()

//Upload Image to Canvas
document.getElementById('wallImage').addEventListener('change', uploadImgToCanvas)

function uploadImgToCanvas(){
    const file = document.getElementById('wallImage').files[0]
    const reader = new FileReader()

    if(file){
        reader.readAsDataURL(file)
    }

    reader.addEventListener('load', () => {
        img = new Image()
        img.src = reader.result
        img.onload = function() {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0, img.width, img.height)
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

//Send imageBase64 and caption to Node
document.getElementById('submit-wallImage').addEventListener('click', submitWallImage)

 function submitWallImage(){
    const imageBase64 = canvas.toDataURL("image/jpeg", 0.8)
    const caption = document.getElementById('caption').value
    const fileLength = document.getElementById('wallImage').files.length

    if(caption === '' && fileLength === 0 ){
        document.getElementById("msg").innerHTML = "Story is required";
        document.getElementById("msg").classList.add('text-lg', 'text-error', 'text-center', 'my-3', 'font-bold', 'uppercase', 'btn', 'btn-outline')

        document.getElementById("msgFile").innerHTML = "Please upload an image"
        document.getElementById("msgFile").classList.add('text-lg', 'text-error', 'text-center', 'my-3', 'font-bold', 'uppercase', 'btn', 'btn-outline')
    }

    else if(caption === '' && fileLength === 1){
        document.getElementById("msg").innerHTML = "Story is required";
        document.getElementById("msg").classList.add('text-lg', 'text-error', 'text-center', 'my-3', 'font-bold', 'uppercase', 'btn', 'btn-outline')

        document.getElementById("msgFile").innerHTML = "";
        document.getElementById("msgFile").classList.remove('text-lg', 'text-error', 'text-center', 'my-3', 'font-bold', 'uppercase', 'btn', 'btn-outline')


    }
    else if(fileLength === 0 && caption !== ''){
        document.getElementById("msgFile").innerHTML = "Please upload an image";
        document.getElementById("msgFile").classList.add('text-lg', 'text-error', 'text-center', 'my-3', 'font-bold', 'uppercase', 'btn', 'btn-outline')
        document.getElementById("msg").innerHTML = "";
        document.getElementById("msg").classList.remove('text-lg', 'text-error', 'text-center', 'my-3', 'font-bold', 'uppercase', 'btn', 'btn-outline')

    }
    else
    {
        document.getElementById("msg").innerHTML = "";
        document.getElementById("msg").classList.remove('text-lg', 'text-error', 'text-center', 'my-3', 'font-bold', 'uppercase', 'btn', 'btn-outline')

        document.getElementById("msgFile").innerHTML = "";
        document.getElementById("msgFile").classList.remove('text-lg', 'text-error', 'text-center', 'my-3', 'font-bold', 'uppercase', 'btn', 'btn-outline')



     fetch('../wall/createWallPost/', {
            method: 'post',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'imageBase64': imageBase64,
                'caption': caption
            })
        })
        //redirecting from client after sending the 200
        window.location.href = "../wall/feed"
    }
}
