var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
	username:{
		unique:true,
		type:String
	},
	password:String
});
UserSchema.pre('save',function(next){
	var user = this;
	bcrypt.genSalt(SALT_WORK_FACTOR,function(err,salt){
        if (err) 
            return next(err);
        bcrypt.hash(user.password,salt,null,function(err,hash){
            if (err) return next(err);
            user.password = hash;
            next();
        });

    });
})
UserSchema.methods.comparePassword = function(_password,cb){
    bcrypt.compare(_password,this.password,function(err,isMatch){
        if (err){
            return cb(err);
        }
        else {
            cb(null,isMatch);
        }
    });
};
module.exports = mongoose.model('user',UserSchema);