var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SoftwareSchema = new Schema({
	title: String,
	publisher: String,
	tag: String,
	description: String,
	website: String,
	icon: String,
	rating: Number,
})

var Software = mongoose.model('Software',SoftwareSchema);
module.exports = Software;