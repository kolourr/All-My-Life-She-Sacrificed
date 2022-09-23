document.querySelector(".stripebutton").addEventListener("click", makePayment);

function makePayment() {
  const momName = document.getElementById("momName").value;
  const momEmail = document.getElementById("momEmail").value;
  const childName = document.getElementById("childName").value;

  const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (momName === "" || momEmail === "" || childName === "") {
    document.getElementById("msg").innerHTML =
      "Please fill out all fields correctly!";

  } 
  else if (
    emailRegexp.test(momEmail) === true &&
    (momName === "" || childName === "")
  ) {
    document.getElementById("emailvalidate").innerHTML = "";
  }
  else if (emailRegexp.test(momEmail) === false) {
    document.getElementById("emailvalidate").innerHTML =
      "Please enter a valid email address!";

  } else if (emailRegexp.test(momEmail) === false &&
    (momName !== "" || childName !== ""))

  {
    document.getElementById("emailvalidate").innerHTML = "";
  } 
  
 else if (
    emailRegexp.test(momEmail) === true &&
    momName !== "" &&
    childName !== ""
  ) {
    document.getElementById("msg").innerHTML = "";
    document.getElementById("emailvalidate").innerHTML = "";

    fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [{ id: 1, quantity: 1 }],
        momName: momName,
        momEmail: momEmail,
        childName: childName,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  }
}
