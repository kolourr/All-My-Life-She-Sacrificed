require("dotenv").config({ path: "./config/.env" });

const sendUsertoSendy = async function (
name,email
) {
  const params = {
    api_key: process.env.SENDY_API_KEY,
    list: process.env.LIST_ID,
    name: name,
    email: email,
    boolean: true,
  };

  function convert(params) {
    return Object.keys(params)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
      )
      .join("&");
  }

  const sendySubResponse = await fetch(`${process.env.SENDY_URL}/subscribe`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: convert(params),
  });

  const data = await sendySubResponse.text();
  console.log(data);

  const subParams = {
    api_key: process.env.SENDY_API_KEY,
    list_id: process.env.LIST_ID,
  };

  const sendySubCount = await fetch(
    `${process.env.SENDY_URL}/api/subscribers/active-subscriber-count.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: convert(subParams),
    }
  );
  const dataSubCount = await sendySubCount.text();
  console.log(`Subscriber count is ${dataSubCount}`);
};

module.exports = sendUsertoSendy;
