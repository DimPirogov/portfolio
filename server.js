const fs = require('fs');
const path = require('path');

const dir = "src/environments";
const prodfile = "environment.ts";
const file = "environment.ts.dev";

const content = `${process.env.RAPIDAPI_KEY}`;

fs.access(dir, fs.constants.F_OK, (err) => {
  if (err) {
    console.log("src folder does not exist, creating now", process.cwd());
    try {
      fs.mkdirSync(dir, { recursive: true });
    }
    catch (err) {
      console.error(`Error while creating ${dir}. Error is ${err}`);
      process.exit(1);
    }
  }
  try {
    fs.writeFileSync(dir + "/" + file, content);
    fs.writeFileSync(dir + "/" + prodfile, content);
    console.log("Created successfully in", process.cwd());
    if (fs.existsSync(dir + "/" + file)) {
      console.log("File is created", path.resolve(dir + "/" + file));
      const str = fs.readFileSync(dir + "/" + file).toString();
      console.log(str);
    }
  } catch (err) {
    console.error(`Error while creating ${file}. Error is ${err}`);
    process.exit(1);
  }
});
