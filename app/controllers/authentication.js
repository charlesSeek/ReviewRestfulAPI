var User = require('../models/user');

//user password authentication
exports.authRequired = function(req,res,next){
	var username = req.body.username;
	var password = req.body.password;
	if (!username||!password){
		res.status(422).json({message:'username and password are not empty'});
	}else{
		User.find({username:username},function(err,users){
			if (err){
				res.status(500).json(err);
			}else{
				if(users.length<1){
					res.json({message:'user is not existed'});
				}else {
					users[0].comparePassword(password,function(err,isMatch){
						if (err){
							res.status(500).json(err);
						}else{
							if (isMatch){
								next();
							}else{
								res.json({message:'invalid password'});
							}
						}
					});
				}
			}
		});
	}
}