// The following script examines all subfolders (recursively) as long as they have package.json and runs npm install in each of them. One can add exceptions to it: folders allowed not having package.json. In the example below one such folder is "packages". One can run it as a "preinstall" script.

const path = require("path");
const fs = require("fs");
const child_process = require("child_process");

const root = process.cwd(); //var process: NodeJS.Process
npm_install_recursive(root); //function npm_install_recursive(folder: any): void

// Since this script is intended to be run as a "preinstall" command,
// it will do `npm install` automatically inside the root folder in the end.
console.log(
  "==================================================================="
);
console.log(`npm install in root directory`);
console.log(
  "==================================================================="
);

// Recurses into a folder
function npm_install_recursive(folder) {
  const has_package_json = fs.existsSync(path.join(folder, "package.json"));

  // Abort if there's no `package.json` in this folder and it's not a "packages" folder
  if (!has_package_json && path.basename(folder) !== "packages") {
    return;
  }

  // If there is `package.json` in this folder then perform `npm install`.
  //
  // Since this script is intended to be run as a "preinstall" command,
  // skip the root folder, because it will be `npm install`ed in the end.
  // Hence the `folder !== root` condition.
  //
  if (has_package_json && folder !== root) {
    console.log(
      "==================================================================="
    );
    console.log(
      `Performing "npm install" inside ${
        folder === root ? "root folder" : "./" + path.relative(root, folder)
      }`
    );
    console.log(
      "==================================================================="
    );
    npm_install(folder);
  }

  // Recurse into subfolders
  for (let subfolder of subfolders(folder)) {
    npm_install_recursive(subfolder);
  }
}

// Performs `npm install`
const npm_install = (where) => {
  child_process.execSync("npm install", {
    cwd: where,
    env: process.env,
    stdio: "inherit",
  });
};

// Lists subfolders in a folder
const subfolders = (folder) => {
  return fs
    .readdirSync(folder)
    .filter((subfolder) =>
      fs.statSync(path.join(folder, subfolder)).isDirectory()
    )
    .filter((subfolder) => subfolder !== "node_modules" && subfolder[0] !== ".")
    .map((subfolder) => path.join(folder, subfolder));
};
