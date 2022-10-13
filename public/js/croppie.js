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
            mode: 'cors',
            cache: 'default',
              method: 'post',
              headers: {'Content-type': 'application/json'},
              body: JSON.stringify({
                  'base64': response
              })



          })
          location.reload()

  })
}


document.querySelector('.refresh-profile').addEventListener('click', () => {
    window.location.reload();

})
