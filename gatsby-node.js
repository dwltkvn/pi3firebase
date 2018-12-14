/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const fs = require('fs')

exports.onPreBootstrap = () => {
  console.log('OnPreBootstrap ------------------')
  // for each secrets (key/value) hosted on codesansbox, push them in a secrets string
  let secrets = ''
  for (var propertyName in process.env) {
    if (
      process.env.hasOwnProperty(propertyName) &&
      ~propertyName.indexOf('kdo_')
    ) {
      secrets += `${propertyName}=${process.env[propertyName]}\n`
    }
  }

  // then write this string to .env.development file, which allows env var to to used in gatsby project
  fs.writeFile('.env.development', secrets, err => {
    if (err) throw err
    console.log('Dev env var saved!')
  })

  fs.writeFile('.env.production', secrets, err => {
    if (err) throw err
    console.log('Prod env var saved!')
  })
}
