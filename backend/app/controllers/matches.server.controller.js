var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Match = mongoose.model('Match'),
	_ = require('lodash');

exports.create = function(req, res) {
	var match = new Match(req.body);
	match.user = req.user;

	match.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(match);
		}
	});
};

exports.read = function(req, res) {
	res.jsonp(req.match);
};
exports.update = function(req, res) {
	var match = req.match ;

	match = _.extend(match , req.body);

	match.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(match);
		}
	});
};

exports.delete = function(req, res) {
	var match = req.match ;

	match.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(match);
		}
	});
};

exports.matchByID = function(req, res, next, id) {
	Match.findById(id).populate('user', 'displayName').exec(function(err, match) {
		if (err) return next(err);
		if (! match) return next(new Error('Failed to load Match ' + id));
		req.match = match ;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.match.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
