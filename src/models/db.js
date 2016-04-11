var config = require('../config/db'),
		Db = require('mongodb').Db,
		Connection = require('mongodb').Connection,
		Server = require('mongodb').Server;
var dbConnect = new Db(config.db,new Server(config.host,config.port),{safe:true});

module.exports = dbConnect;
