const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const htmlReg = /(\.html)$/

const dirname = process.cwd()

const defaultOptions = {
  content: 'content.json',
  functions: 'ejs.functions.js'
}

exports.postBuild = function (files, config, options) {
  return new Promise((resolve, reject) => {
    try {
      const finalOptions = Object.assign({}, defaultOptions, options)
      fs.readFile(path.resolve(dirname, finalOptions.content), function (err, data) {
        if (err) {
          reject(err)
        }

        let functions = require(path.resolve(dirname, finalOptions.functions))

        if (!functions) {
          functions = {}
        }

        const json = JSON.parse(data) || {}
        const next = files.map(file => {
          if (file.src.match(htmlReg)) {
            return Object.assign({}, file, {
              content: ejs.render(
                file.content.toString(),
                {
                  ...json,
                  ...functions
                },
                {
                  root: path.resolve(dirname, 'src'),
                  client: true
                }
              )
            })
          } else {
            return file
          }
        })
        resolve(next)
      })
    } catch (err) {
      reject(err)
    }
  })
}
