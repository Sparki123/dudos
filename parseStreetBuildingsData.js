const { parse } = require("node-html-parser");

function parseStreetBuildingsData(streetId, html) {
  const root = parse(html);
  const trs = root.querySelectorAll("tbody tr");
  const data = trs.map((tr) => {
    const tds = tr.querySelectorAll("td");
    const href = tds[tds.length - 1].querySelector("a")?.getAttribute("href");
    return [tds.map((td) => td.text), href];
  });

  return data.map(([item, seriesHref]) => {
    return {
      streetId,
      seriesHref,
      ...parseBuildingInfo(item),
    };
  });
}

function parseBuildingInfo(build) {
  let [_, number, wall, floor, year, series] = build;
  number = number.slice(2);
  return {
    number,
    wall,
    floor,
    year,
    series,
  };
}

module.exports = {
  parseStreetBuildingsData,
};
