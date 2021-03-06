const http = require('http')
const fs = require('fs')
const port = 5500

const requestHandler = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || req.headers.host);
	res.setHeader('Access-Control-Request-Method', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
	res.setHeader('Access-Control-Allow-Headers', '*');

  if ( req.method === 'OPTIONS' ) {
		res.writeHead(200)
		res.end()
		return
	}

  if (req.method === 'GET') {
    res.end('Nothing here, you must be lost.')
    return
  }

  const firstarg = req.url.match(/^\/([a-zA-Z0-9-]+)\/?$/)
  const file = firstarg ? firstarg[1] : 'unknown'

  let body = [];
  req.on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();

    fs.appendFileSync('logs/' + file, new Date().toISOString() + ' ' + body + "\n")

    res.end('Thank you!')
  });
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
