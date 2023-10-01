const fs = require("fs");
const axios = require("axios");

function handleOutput(data, output) {
  if (output) {
    fs.writeFile(output, data, "utf8", function (err) {
      if (err) {
        console.log("Error occurred:", err);
        process.exit(1);
      }
    });
  } else {
    console.log(data);
  }
}

function cat(path, output) {
  fs.readFile(path, "utf8", function (err, data) {
    if (err) {
      console.log("Error occurred:", err);
      process.exit(1);
    } else {
      handleOutput(data, output);
    }
  });
}

async function webCat(url, output) {
  try {
    const res = await axios.get(url);
    handleOutput(res.data, output);
  } catch (err) {
    console.log("Error occurred:", err);
    process.exit(1);
  }
}

let path;
let output;

if (process.argv[2] === "--out") {
  path = process.argv[4];
  output = process.argv[3];
} else {
  path = process.argv[2];
}

if (path.slice(0, 4) === "http") {
  webCat(path, output);
} else {
  cat(path, output);
}
