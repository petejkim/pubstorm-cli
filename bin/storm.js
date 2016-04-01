#!/usr/bin/env node

var path = require('path'),
    childProcess = require('child_process');

var binName = "storm";

function hasPrefix(str, prefix) {
  return str.slice(0, prefix.length) === prefix;
}

function hasSuffix(str, suffix) {
  return str.slice(-suffix.length) === suffix;
}

function findIndex(arr, fn) {
  var i = 0;
  for (i = 0; i < arr.length; i++) {
    if (fn(arr[i])) {
      return i;
    }
  }
  return -1;
}

var platform = process.platform;
if (hasPrefix(platform, "win")) {
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
if (platform === "windows") {
  executable += ".exe";
}

var argStartIndex = findIndex(process.argv, function(arg) {
  return hasSuffix(arg, "storm.js") || hasSuffix(arg, "storm");
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
