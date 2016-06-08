'use strict'

const { join } = require('path')
const { homedir } = require('os')
const { exec } = require('child_process')
const { node } = require('node-latest')
const download = require('./download')

const defaultDir = join(homedir(), 'Downloads')

const defaultVersion = v => v ? Promise.resolve(v) : node.latest()

const fetch = ({ version, bits = 64, dir = defaultDir } = {}) => {

    return defaultVersion(version).then(version => {

        const arch =  bits == 32 ? 'x86' : 'x64'
        const file = `node-v${version}-${arch}.msi`
        const path = join(dir, file)

        return download(`https://nodejs.org/dist/v${version}/${file}`, path)
    })
}

const start = path => new Promise((resolve, reject) => {
    exec(`start "" ${path}`, err => err ? reject(err) : resolve())
})

module.exports = { fetch, start }
