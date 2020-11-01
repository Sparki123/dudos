const fs = require("fs").promises;

function loadAllStreets() {
  const alpha = "ауоыиэяюёе".split("");
  batchAndFetchWithDelay(getStreetsByQuery, alpha, 1, 1000)
    .then((data) => {
      const streets = data.flatMap((item) => item.response);

      const mapData = new Map();
      for (let item of streets) {
        mapData.set(item.id, item);
      }
      const streetsUniq = [...mapData.values()].sort((a, b) => a.id - b.id);
      const jsonData = JSON.stringify(streetsUniq);
      console.log("total:", streetsUniq.length);

      return fs.writeFile("streetsId.json", jsonData);
    })
    .then(() => console.log("ok"))
    .catch((e) => console.log("ne ok", e));
}

module.exports = {
  loadAllStreets,
};
