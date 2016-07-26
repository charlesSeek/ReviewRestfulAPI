var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ReviewSchema = new Schema({
	username:String,
	content:String,
	createdAt:{
		type:Date,
		default:Date.now()
	},
	updatedAt:{
		type:Date,
		default:Date.now()
	}
});
module.exports = mongoose.model('Review',ReviewSchema);