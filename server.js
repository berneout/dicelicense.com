const escapeHTML = require('escape-html')
const generate = require('./generate')
const http = require('http')
const wordWrap = require('word-wrap')

http.createServer((request, response) => {
  response.setHeader('Content-Type', 'text/html')
  request.end(`
<!doctype html>
<html lang=en-US>
  <head>
    <meta charset=UTF-8>
    <title>Dice License</title>
    <link href=styles.css rel=stylesheet>
  </head>
  <body>
    <header role=banner>
      <h1>Dice License</h1>
    </header>
    <main role=main>
    <pre>${wordWrap(generate(), { width: 60, indent: '', escape: escapeHTML})}</pre>
    </main>
  </body>
</html>
  `)
})
