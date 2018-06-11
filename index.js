var server = require("./routeserver");
var router = require("./router");
 
server.start(router.route);
