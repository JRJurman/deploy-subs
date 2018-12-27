# deploy-subs
🥪deploy subdirectories as branches

CLI and JS tool for deploying packages that exist in a sub-directory as branches.

This tool is useful if you have a project whose exposed packages exist as subdirectories (see [create-react-app](https://github.com/facebook/create-react-app/tree/master/packages)).
This tool allows you to surface those packages into branches that you can install in a `package.json`.

## Install
```
npm install deploy-subs
```

## CLI Usage
For the CLI you can use `-d` to point to the directory that you'd like to target:

```
deploy-subs -d ./packages
```

I'm willing to build out more command line arguements as they are requested, or feel free to make a PR to add more!

### CLI Options
```
Options:
  -d, --directory <value>  Directory of packages in project
  -f, --filter <value>     [optional] Filter of directoreis to keep
  -v, --verbose            [optional] Flag to enable verbose logging
  -h, --help               output usage information
```

## API Usuage
For the API the function returns either 0 if everything went okay, or -1 if things didn't.
This project leans heavily on [gh-pages](https://github.com/tschaub/gh-pages), so look at that project to see if it might better suit your needs.

```js
const deploySubs = require('deploy-subs')
deploySubs({
  directory: './packages'
})
```
