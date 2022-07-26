const restify = require('restify')
const routes = require('../routes')
const cors = require('../server/cors')
const server = restify.createServer()

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser())
routes(server)

module.exports = server