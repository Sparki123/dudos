const { dbWriteBuildings } = require("./createDb");
const streets = require("./streetsId.json");
const { parseStreetBuildingsData } = require("./parseStreetBuildingsData");
const { batchAndFetchWithDelay } = require("./batchAndFetchWithDelay");
const { getBuildingByStreet } = require("./getBuildingByStreets");

const streetsIds = streets.map((s) => s.id);

async function loadParseAndWriteToDb(streetId) {
  const data = await getBuildingByStreet(streetId);
  const arr = parseStreetBuildingsData(streetId, data);
  const result = await dbWriteBuildings(arr);
  console.log(streetId, "ok");
}

batchAndFetchWithDelay(loadParseAndWriteToDb, streetsIds);


