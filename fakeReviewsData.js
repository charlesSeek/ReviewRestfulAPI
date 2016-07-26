var Faker = require('Faker');
var _ = require('lodash');
var mongoose = require('mongoose');
var dbUrl = 'mongodb://127.0.0.1/reviews';
mongoose.connect(dbUrl);
var Schema = mongoose.Schema;
var counter = 0
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
})
var Review = mongoose.model('Review',ReviewSchema);

_.times(60,function(){
	var username = Faker.Internet.userName();
	//var movieId = Faker.random.array_element(["542c2b97bac0595474108b48","632c2b97bcc0595474108b48","562c2b97bcc0595474108b49"]);
	var content = Faker.Lorem.paragraph();
	var review = {username:username,content:content};
	_review = new Review(review);
	_review.save(function(err,review){
		if (err){
			console.log(err);
		}else{
			console.log(review);
		}
		counter++;
		if (counter==60){
			mongoose.disconnect();
		}
	})

})


