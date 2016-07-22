PubStorm CLI
============

### Releasing a new version on NPM

1. Edit `VERSION` in
   [rise-cli-go](https://github.com/nitrous-io/rise-cli-go/).
2. Build production binaries: `RISE_CLI_ENV=production script/build`
3. Remove old binaries in `dist/` folder: `rm -rf ~/code/pubstorm-cli/dist`
4. Move newly built binaries to `dist/` folder: `mv ./dist ~/code/pubstorm-cli`
5. `cd ~/code/pubstorm-cli`
6. Edit version in `package.json`.
7. Check version by running `dist/linux_amd64/storm -v).
8. Commit and push.
9. Publish to NPM: `npm publish`
10. Update latest available version in S3 bucket `bucket=pubstorm-updates`.

- - -
Copyright (c) 2016 PubStorm.com. All Rights Reserved.
