const axios = require("axios");

function getBuildingByStreet(streetId) {
  const params = new URLSearchParams();
  params.append("id", streetId);

  return axios("http://tipdoma.ru/search_bld.php", {
    params,
  }).then((response) => response.data);
}

module.exports.getBuildingByStreet = getBuildingByStreet;
