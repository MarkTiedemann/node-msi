'use strict'

const { join } = require('path')
const { homedir } = require('os')
const { createWriteStream } = require('fs')
const { exec } = require('child_process')
const request = require('request')
const { node } = require('node-latest')

const defaultDir = join(homedir(), 'Downloads')

const stream = ({ version, bits = 64, dir = defaultDir }) => {
    return new Promise((resolve, reject) => {

        const arch =  bits == 32 ? 'x86' : 'x64'
        const file = `node-${version}-${arch}.msi`
        const path = join(dir, file)

        const writeStream = createWriteStream(path)
        const readStream = request(`https://nodejs.org/dist/${version}/${file}`)

        writeStream.on('error', err => reject(err))
        readStream.on('error', err => reject(err))
        writeStream.on('close', () => resolve(path))

        readStream.pipe(writeStream)
    })
}

const fetchVersion = version => {
    if (!version) return node.fetchLatest()
    else return Promise.resolve(version)
}

const fetch = ({ version, bits, dir } = {}) => {
    return fetchVersion(version).then(version => {
        return stream({ version, bits, dir })
    })
}

const start = path => {
    return new Promise((resolve, reject) => {
        exec(`start "" ${path}`, err => {
            if (err) reject(err)
            else resolve()
        })
    })
}

module.exports = { fetch, start }
