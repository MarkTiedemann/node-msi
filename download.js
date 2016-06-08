'use strict'

const { createWriteStream, unlink } = require('fs')
const { get } = require('https')

module.exports = (url, path) => new Promise((resolve, reject) => {

    const file = createWriteStream(path)

    const request = get(url, response => {
        response.pipe(file)
        file.on('finish', () => {
            file.close(() => resolve(path))
        })
    })

    request.on('error', err => {
        unlink(path)
        reject(err)
    })
})
