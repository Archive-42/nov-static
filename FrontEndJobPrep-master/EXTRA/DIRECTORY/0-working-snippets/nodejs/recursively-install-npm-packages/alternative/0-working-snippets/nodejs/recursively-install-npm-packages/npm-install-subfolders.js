let fs = require("fs");
let resolve = require("path").resolve;
let join = require("path").join;
let cp = require("child_process");
let os = require("os");

// get library path
let lib = resolve(__dirname, "../lib/");

fs.readdirSync(lib).forEach(function (mod) {
  let modPath = join(lib, mod);

  // ensure path has package.json
  if (!fs.existsSync(join(modPath, "package.json"))) {
    return;
  }

  // npm binary based on OS
  let npmCmd = os.platform().startsWith("win") ? "npm.cmd" : "npm";

  // install folder
  cp.spawn(npmCmd, ["i"], {
    env: process.env,
    cwd: modPath,
    stdio: "inherit",
  });
});
