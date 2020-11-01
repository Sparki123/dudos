require("dotenv").config();

const { Pool } = require("pg");
const format = require("pg-format");
const pool = new Pool();

const { parseStreetBuildingsData } = require("./parseStreetBuildingsData.js");

async function dbWriteBuildings(buildings) {
  if (buildings.length === 0) {
    console.log("[empty]");
    return;
  }
  const [{ streetId }] = buildings;
  try {
    const values = buildings.map(
      ({ streetId, seriesHref, number, wall, floor, year, series }) => [
        streetId,
        seriesHref,
        number,
        wall,
        floor,
        year,
        series,
      ]
    );
    const query = format(
      "insert into buildings (street_id, link, number, wall, floor, year, series) values %L",
      values
    );
    const res = await pool.query(query);
  } catch (e) {
    console.log("[db error]", streetId);
  }
  // await pool.end();
}

const html = `<div class="well well-small">
<div style="float:left;">
  <h4></h4>
</div>
<div style="float:right;"><a target="_blank" href="http://sob.ru/prodazha-kvartir/per-mamonovskiy
"><button class="btn btn-success" type="button">Узнать цены на этой улице</button></a></div>
<table class="table table-striped">
  <thead>
    <tr>
      <th class="enum">#</th>
      <th>Адрес</th>
      <th class="walls">Стены</th>
      <th title="Этажей">Эт.<span class="socr">ажей</span></th>
      <th>Год</th>
      <th>Серия или ЖК</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="enum">1</td>
      <td><a target="_blank" href="https://maps.yandex.ru/?z=16&text=, 2 стр.1">, 2 стр.1</a></td>
      <td class="walls">кирпичные</td>
      <td>6</td>
      <td>1908</td>
      <td>индивидуальный проект</td>
    </tr>
    <tr>
      <td class="enum">2</td>
      <td><a target="_blank" href="https://maps.yandex.ru/?z=16&text=, 9 стр.2">, 9 стр.2</a></td>
      <td class="walls">кирпичные</td>
      <td>8</td>
      <td>1949</td>
      <td><a target="_blank" href="series_p-44.html">П-44</a></td>
    </tr>
  </tbody>
</table>
</div>`;

// const buildings = parseStreetBuildingsData(12, html);
// dbWrite(buildings);

exports.dbWriteBuildings = dbWriteBuildings;
