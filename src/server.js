const https = require('https')
const http = require('http')
const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()
let httpServer = http.createServer(app)

process.env.NODE_ENV = 'production';
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
    httpServer = https.createServer({
        cert: fs.readFileSync('/etc/letsencrypt/live/abubakr.uz/cert.pem', 'UTF-8'),
        key: fs.readFileSync('/etc/letsencrypt/live/abubakr.uz/privkey.pem', 'UTF-8'),
        ca: fs.readFileSync('/etc/letsencrypt/live/abubakr.uz/fullchain.pem', 'UTF-8')
    }, app)
}

app.use(express.static(path.join(__dirname, './public')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public', '/asd.html'))
})

// app.listen(3000, console.log(3000))
httpServer.listen(443, console.log(443))