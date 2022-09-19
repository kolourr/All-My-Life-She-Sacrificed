//Service Worker - can also listen for the install, activate, fetch and message events - extendable events - self is the other name for window 

  self.addEventListener("push", e => {
    const data = e.data.json();
    const options = {
      body: `For the last week, out of ${data.allWallPosts} wall posts, you've made ${data.userWallPosts} posts and out of ${data.allTextPosts} text posts, you've made ${data.userTextPosts}`,
      icon: "https://www.kolourr.com/content/images/2022/06/K.png",
      vibrate: [200, 100, 200, 100, 200, 100, 200],

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

