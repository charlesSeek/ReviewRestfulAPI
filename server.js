var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var Review = require('./app/models/review');
var User = require('./app/models/user');
var auth = require('./app/controllers/authentication');

//log all request in the apache combined format to stdout
app.use(morgan('combined'));

//mongodb config
var mongoose = require('mongoose');
var dbUrl = 'mongodb://127.0.0.1/reviews';
mongoose.connect(dbUrl);

//use body-parser middleware to get post data
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json({type:'*/*'}));

var port = process.env.PORT||8000;

/*
	route for CURD
 */
app.get('/api',function(req,res){
	res.json({message:"welcome to access movie reviews api"});
})

//Get all the reviews
app.get('/api/reviews',function(req,res){
	Review.find(function(err,reviews){
		if (err){
			res.status(500).json(err);
		}
		res.json(reviews);
	})
})
	
//Post a new reviews
app.post('/api/reviews',function(req,res){
	var review = new Review();
	var username = req.body.username;
	var content = req.body.content;
	if (!username||!content){
		res.status(422).json({message:'username and content can not be empty'});
	}else {
		review.username = username;
		review.content = content;
		review.save(function(err){
			if (err){
				res.status(500).json(err);
			}else {
				res.json({message:'new review is successfully created'});
			}
		})
	}
})

//get one review by id
app.get('/api/reviews/:id',function(req,res){
	Review.findById(req.params.id,function(err,review){
		if (err){
			res.status(500).json(err);
		}else {
			res.json(review);
		}
	})

});

//update a review by id
app.put('/api/reviews/:id',function(req,res){
	var username = req.body.username;
	var content = req.body.content;
	if (!username||!content){
		res.status(422).json({message:'username and content can not be empty'});
	}else{
		Review.findById(req.params.id,function(err,review){
			if (err){
				res.status(500).json(err)
			}else{
				if(!review){
					review = new Review();
					review.username = username;
					review.content = content;
					review.save(function(err){
						if(err){
							res.status(500).json(err);
						}else{
							res.json({message:'new review is successfully created'});
						}
					})
				}else{
					review.username = username;
					review.content = content;
					review.updatedAt = new Date();
					review.save(function(err){
						if(err){
							res.status(500).json(err);
						}else{
							res.json({message:'the review is successfully updated'});
						}
					});
				}
			}
		});
	}
});

//delete a review by id
app.delete('/api/reviews/:id',auth.authRequired,function(req,res){
	Review.remove({_id:req.params.id},function(err,review){
		if (err){
			res.status(500).json(err);
		}else{
			res.json({message:'the review is successfully deleted'});
		}
	})

});

//user sign up api
app.post('/api/signup',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	if (!username||!password){
		res.status(422).json({message:'the username and password are not empty'});
	}else{
		User.find({username:username},function(err,users){
			if(err){
				res.status(500).json(err);
			}else{
				if (users.length>=1){
					res.json({message:'the user is existed'});
				}else {
					var user = new User();
					user.username = username;
					user.password = password;
					user.save(function(err,user){
						if (err){
							res.status(500).json(err);
						}else{
							res.json({message:'user is successfully created'});
						}
					})
				}
			}
		})
	}
});

app.listen(port);
console.log('the server is running on '+port );
