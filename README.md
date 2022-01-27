## Express SendGrid Inbound Parse

A Node.js / Express.js app using SendGrid's Inbound Parse to parse email data / attachments (SSL Version).

### Prerequisites

- Create a valid SSL certificate using certbot
- Modify `<placeholders>` into index.js according you your needs

[SendGrid Guide](https://sendgrid.com/docs/for-developers/parsing-email/setting-up-the-inbound-parse-webhook/)
- Log into your SendGrid account
- Go to Settings > Inbound Parse
- Click `Add Host & URL`

  - Select a verified domain
  - Add a `Destination URL` (This has to be publicly available. Use a valid fqdn instead of an IP)
  - Check `Check incoming emails for spam` (This will return a `spam_score` and `spam_report`)
  - Leave `POST the raw, full MIME message` unchecked

- Log into you domain registrar
- Add an MX record
  - Host `parse`
  - TTL `10m`
  - Mail Server `mx.sendgrid.net`

### Install

1. `npm install`
2. `npm start`

You can now test the Inbound Parse by sending an email to `[anything]@[domain]`.
#### Parsed data properties

```js
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
console.log("['content-ids']=> ", body['content-ids'], "\n")
```

