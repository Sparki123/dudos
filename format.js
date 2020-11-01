const { readFileSync, writeFileSync } = require("fs");

const s = readFileSync("./streetsId.json", "utf8");
const d = JSON.parse(s)
  .map(({ id, street }) => `${id}\t${street}`)
  .join("\n");

writeFileSync("./streetsId.csv", d, "utf8");
