
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Delivery = mongoose.model('Delivery'),
	_ = require('lodash');

exports.create = function(req, res) {
	var delivery = new Delivery(req.body);
	delivery.user = req.user;

	delivery.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(delivery);
		}
	});
};

exports.read = function(req, res) {
	res.jsonp(req.delivery);
};
exports.update = function(req, res) {
	var delivery = req.delivery ;

	delivery = _.extend(delivery , req.body);

	delivery.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(delivery);
		}
	});
};
exports.delete = function(req, res) {
	var delivery = req.delivery ;

	delivery.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(delivery);
		}
	});
};
exports.list = function(req, res) {
	Delivery.find().sort('-created').populate('user', 'displayName').exec(function(err, deliveries) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(deliveries);
		}
	});
};

exports.deliveryByID = function(req, res, next, id) {
	Delivery.findById(id).populate('user', 'displayName').exec(function(err, delivery) {
		if (err) return next(err);
		if (! delivery) return next(new Error('Failed to load Delivery ' + id));
		req.delivery = delivery ;
		next();
	});
};

exports.hasAuthorization = function(req, res, next) {
	if (req.delivery.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
