var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Inning = mongoose.model('Inning'),
	_ = require('lodash');

exports.create = function(req, res) {
	var inning = new Inning(req.body);
	inning.user = req.user;

	inning.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inning);
		}
	});
};

exports.read = function(req, res) {
	res.jsonp(req.inning);
};
exports.update = function(req, res) {
	var inning = req.inning ;

	inning = _.extend(inning , req.body);

	inning.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inning);
		}
	});
};

exports.delete = function(req, res) {
	var inning = req.inning ;

	inning.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(inning);
		}
	});
};
exports.list = function(req, res) {
	Inning.find().sort('-created').populate('user', 'displayName').exec(function(err, innings) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(innings);
		}
	});
};

exports.inningByID = function(req, res, next, id) {
	Inning.findById(id).populate('user', 'displayName').exec(function(err, inning) {
		if (err) return next(err);
		if (! inning) return next(new Error('Failed to load Inning ' + id));
		req.inning = inning ;
		next();
	});
};
exports.hasAuthorization = function(req, res, next) {
	if (req.inning.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
