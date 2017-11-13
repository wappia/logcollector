const http = require('http')
const fs = require('fs')
const port = 5500

const requestHandler = (request, response) => {
  const file = request.url.match(/^\/([a-zA-Z-]+)\/?$/)[1] || 'unknown'

  let body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    fs.appendFileSync('logs/' + file, new Date().toISOString() + ' ' + body + "\n")

    response.end('Thank you!')
  });
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
