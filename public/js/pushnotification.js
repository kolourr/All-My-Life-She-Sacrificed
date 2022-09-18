const publicVapidKey =
  "BOptvNlb_hsDkQmAc0fbJhlyvpjIy3rt_bBcU9kcQRnbjx-FrmNq4S3tYSOXkHi37Ex4YovmA7w487z6GOQ4R3g";

// Check for service worker
if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
 
}

// // Register SW, Register Push, Send Push
async function send() {
  const register = await navigator.serviceWorker.register("/js/serviceworker.js", {
    // scope: "/js/"
  });

  // Register Push
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  // Send Push Notification
  await fetch("subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push Sent...");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
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
