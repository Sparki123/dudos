const axios = require("axios");

const garbageWords = [
  "бульвар",
  "площадь",
  "улица",
  "набережная",
  "проезд",
  "переулок",
  "тупик",
  ",",
];

function getStreetsByQuery(street) {
  const re = new RegExp(garbageWords.join("|"), "gi");
  const str = street.replace(re, "").trim();
  console.log(str);

  const params = new URLSearchParams();

  params.append("value", str);
  return axios("http://tipdoma.ru/search_str.php", {
    params,
  }).then((response) => {
    const regexp = /change_building\((?<id>\d+),\s'(?<street>[^']+)'\)/g;
    const ans = Array.from(response.data.matchAll(regexp));

    return ans.map((match) => match.groups);
  });
}

module.exports = {
  getStreetsByQuery,
};
