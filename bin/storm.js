#!/usr/bin/env node

var path = require('path'),
    childProcess = require('child_process');

var binName = "storm";

var platform = process.platform;
if (platform.startsWith("win")) {
  platform = "windows";
}

var arch = process.arch;
switch (process.arch) {
  case 'ia32':
    arch = '386';
    break;
  case 'x64':
    arch = 'amd64';
    break;
}

var executable = path.join(__dirname, "..", "dist", platform+"-"+arch, binName);
if (platform == "windows") {
  executable += ".exe";
}

var argStartIndex = process.argv.findIndex(function(arg) {
  return arg.endsWith("storm.js") || arg.endsWith("storm");
});

var cp = childProcess.spawn(executable, process.argv.slice(argStartIndex+1), {
  cwd: process.cwd(),
  stdio: 'inherit',
  detached: false,
  env: process.env
});

cp.on('error', function(err) {
  process.stderr.write("Failed to execute "+binName+" binary.\n")
  process.exit(1);
});

cp.on('close', function(code) {
  process.exit(code);
});
