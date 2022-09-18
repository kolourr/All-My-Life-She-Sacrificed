self.addEventListener("push", e => {
    const data = e.data.json();
    const options = {
      body: "This is Bruce Rebllo!",
      icon: "https://www.kolourr.com/content/images/2022/06/K.png",
    }

  const promiseChain = Promise.all([
    self.registration.update(),
    self.registration.showNotification(data.title, options)
  ])
  self.skipWaiting();
  e.waitUntil(promiseChain)
    

    console.log("Push Recieved...");

  });
  