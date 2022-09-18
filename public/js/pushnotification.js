const publicVapidKey =
  "BOptvNlb_hsDkQmAc0fbJhlyvpjIy3rt_bBcU9kcQRnbjx-FrmNq4S3tYSOXkHi37Ex4YovmA7w487z6GOQ4R3g";

document.querySelector(".checkMe").addEventListener("click", checkMe);

async function checkMe() {
  document.getElementById("push-notify").innerHTML =
    "Ensure Your Push Notifications are turned on";
  // Check for service worker
  if ("serviceWorker" in navigator) {
    send().catch((err) => console.error(err));
  }
}

// // Register SW, Register Push, Send Push
async function send() {
  //checks if user has granted permission to Push notifications
  if (Notification.permission === "denied") {
    alert("User has blocked push notification.");
    return;
  }

  //Register the Service Worker
  const register = await navigator.serviceWorker.register(
    "/js/serviceworker.js",
    {
      scope: "/js/",
    }
  );

  register.update();
  // Detect Service Worker update and wait for it to be installed
  register.addEventListener("updatefound", () => {
    if (register.installing) {
      register.installing.addEventListener("statechange", () => {
        if (register.waiting) {
          //Do we have a service worker installed?
          if (!navigator.serviceWorker.controller) {
            console.log("Service Worker initialized for the first time");
          }
        }
      });
    }
  });

  // Detect controller change and refresh the page
  //Works the same as navigator.serviceWorker.oncontrollerchange
  let refreshing = false;
  navigator.serviceWorker.addEventListener("controllerchange", () => {
    if (!refreshing) {
      window.location.reload();
      refreshing = true;
    }
  });

  // Register Push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });

  // Send Push Notification
  await fetch("../subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("Push Sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
