const fs = require('fs')
const {removeSync} = require('fs-extra')
const path = require('path')
const ghpages = require('gh-pages')

module.exports = (options) => {
  const {directory, filter, verbose} = options

  /* function to print logs when verbose flag is on */
  const verboseLog = (string) => (element) => {
    if (verbose) console.log('DEPLOY-SUBS: ' + string.join('').replace('{}', element))
    return element
  }

  /* function to build a function that calls gh-pages and on resolving calls the next publisher*/
  const buildPublisher = (dir) => (nextPublisher) => {
    return () => {
      verboseLog`Publishing {}`(dir)

      verboseLog`Clearing the gh-pages cache`()
      removeSync('./node_modules/gh-pages/.cache')

      ghpages.publish(path.join(directory, dir), {
        branch: dir,
      }, (error) => {
        // if we ran into an error, log and stop
        if (error) console.error(error)
        if (error) return -1

        // call next publisher
        nextPublisher()
      })
    }
  }

  /* set the callback of the current publisher to whatever chain we've been working on */
  const collapsePublishers = (workingPublishers, publisher) => publisher(workingPublishers)

  fs.readdirSync(directory)
    .filter(item => filter ? item.match(filter) : true)
    .map(verboseLog`Found Directory: {}`)
    .map(buildPublisher)
    .reverse()
    .reduce(collapsePublishers, () => {
      verboseLog`Finished Publishing Packages`
      return 0
    })()
}

