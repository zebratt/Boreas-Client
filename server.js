var WebSocketServer = require('websocket').server
var http = require('http')

var server = http.createServer(function(request, response) {
    console.log(new Date() + ' Received request for ' + request.url)
    response.writeHead(404)
    response.end()
})
server.listen(8080, function() {
    console.log(new Date() + ' Server is listening on port 8080')
})

wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
})

wsServer.on('request', function(request) {
    var connection = request.accept('echo-protocol', request.origin)

    console.log(new Date() + ' Connection accepted.')

    connection.send(JSON.stringify({ type: 'WAIT' }))

    setTimeout(() => {
        connection.send(JSON.stringify({ type: 'START' }))
    }, 1000)

    connection.on('message', function(message) {
        console.log(`\x1b[33m msgIn: ${JSON.stringify(message)}`);

        if (message.type === 'utf8') {
            const msg = message.utf8Data

            console.log(`\x1b[32m msgOut:${msg}`);

            connection.send(msg)
        }
    })

    connection.on('close', function(reasonCode, description) {
        console.log(new Date() + ' Peer ' + connection.remoteAddress + ' disconnected.')
    })
})
