var fs = require('fs');
var https = require('https');
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/<your_domain>/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/<your_domain>/cert.pem', 'utf8');
var fullChain = fs.readFileSync('/etc/letsencrypt/live/<your_domain>/fullchain.pem', 'utf8');

var credentials = {key: privateKey, cert: certificate, ca: fullChain};
const express = require('express');
const multer = require('multer')

const app = express()
const upload = multer()

app.post('/<your_>/<_endpoint>', upload.any(), async (req, res) => {

    const body = req.body

    console.log("['sender_ip']=> ", body.sender_ip, "\n");
    console.log("['dkim']=> ", body.dkim, "\n");
    console.log("['SPF']=> ", body.SPF, "\n");
    console.log("['spam_report']=> ", body.spam_report, "\n");
    console.log("['spam_score']=> ", body.spam_score, "\n");
    console.log("['headers']=> ", body.headers, "\n");
    console.log("['charsets']=> ", body.charsets, "\n");
    console.log("['html']=> ", body.html, "\n");
    console.log("['text']=> ", body.text, "\n");
    console.log("['attachments']=> ", body.attachments, "\n");
    console.log("['attachment-info']=> ", body['attachment-info'], "\n");
    console.log("['content-ids']=> ", body['content-ids'], "\n");
    
    if (req.files.length > 0) {
        // Log file data
        console.log(req.files)
    } else {
        console.log('No files...')
    }

    return res.status(200).send()
})

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(<port>, '0.0.0.0', () => {
    console.log('Webserver running on port <port>! -> https://0.0.0.0:<port>')
})
