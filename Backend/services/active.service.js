const axios = require("axios");

const SERVER_URL = process.env.SERVER_URL;
const interval = 1000;

function reloadWebsite() {
  axios
    .get(SERVER_URL + "/reload")
    .then((response) => {})
    .catch((error) => {
      console.log("Error reloading server");
    });
}

function keepServerRunning() {
  setInterval(reloadWebsite, interval);
}

module.exports = keepServerRunning;
