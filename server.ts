import http from 'http'
import * as fs from 'fs'
import express from 'express'
import config from './config.json'

let app = express()
app.use('/', express.static('./'))

app.get('/', (request, response) => {
    response.sendFile(`./${config.htmlFile}`)
})

app.listen(config.port, () => console.log(`Listening on port: ${config.port}`))