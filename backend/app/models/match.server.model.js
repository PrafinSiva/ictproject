
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Match Schema
 */
var MatchSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Match name',
		trim: true
	},
	teamA: {
		type: Schema.ObjectId,
		ref: 'Team'
	},
	teamB: {
		type: Schema.ObjectId,
		ref: 'Team'
	},
	overs: {
		type: Number,
		default: 3,
		trim: true
	},
});

mongoose.model('Match', MatchSchema);
