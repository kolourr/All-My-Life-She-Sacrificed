//Service Worker - can also listen for the install, activate, fetch and message events - extendable events 
  self.addEventListener("push", e => {
    const data = e.data.json();
    const options = {
      body: `You have ${data.messages} new messages from Johnny Boy`,
      icon: "https://www.kolourr.com/content/images/2022/06/K.png",
    }

    self.registration.showNotification(data.title, options)
    
    // e.waitUntil(promiseChain)n 
    // Skip waiting to activate but the page will not be using the new service worker
    self.skipWaiting();

    //Claim means to tell the webpages to start using the new service worker 
      clients.claim().then(() => {
        console.log("Push Recieved..");
      })
  
  });

