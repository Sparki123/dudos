const axios = require("axios");
const { parseStreetBuildingsData } = require("./parseStreetBuildingsData");
// инфа про дом + к ней добавить айдишник улицы

function getBuildingByStreet(streetId) {
  const params = new URLSearchParams();
  params.append("id", streetId);

  return axios("http://tipdoma.ru/search_bld.php", {
    params,
  }).then((response) => {
    const arr = parseStreetBuildingsData(streetId, response.data);
    return arr;
  });
}

getBuildingByStreet(1).then(console.log);
// https://node-postgres.com/features/connecting
