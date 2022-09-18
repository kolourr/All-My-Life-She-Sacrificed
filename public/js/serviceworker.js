self.addEventListener("push", e => {
    const data = e.data.json();
    self.registration.showNotification(data.title, {
      body: "Hey what's  there!!",
      icon: "https://www.kolourr.com/content/images/2022/06/K.png"
    })
    console.log("Push Recieved...");

  });
  