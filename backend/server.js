
var init = require('./config/init')(),
	config = require('./config/config'),
	mongoose = require('mongoose'),
	chalk = require('chalk');

var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

var app = require('./config/express')(db);

require('./config/passport')();

app.listen(config.port);

exports = module.exports = app;

console.log('MEAN.JS application started on port ' + config.port);
