'use strict';

var path = process.cwd();
var User = require('../models/users');
var Image = require('../models/images');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/dev/index.html');
		});
		
	app.post('/createnewuser', passport.authenticate('local-signup',{ failureRedirect: '/signupfail', failureFlash: false }), function(req,res){

		User.findOneAndUpdate({'local.username':req.body.username},{'local.email':req.body.email},{new:true}, function(err,data){
			if(err)throw err;
			var userData = {
				email: data.local.email,
				username: data.local.username
			};
			res.send(userData);
		});
	});
	
	app.post('/login', passport.authenticate('local-login', { failureRedirect: '/loginfail', failureFlash: false }), function(req,res){

		User.find({'local.username':req.user.local.username}, function(err,data){
			if(err)throw err;
			var userData = {
				email: req.user.local.email,
				username: req.user.local.username,
			};
			res.send(userData);
		});
	});
	app.get('/loginstatus', function(req,res){

		if(req.user==undefined){
			res.send({});
		}
		else{
			res.send(req.user);
		}
	});
	app.get('/twitterlogin', passport.authenticate('twitter', { failureRedirect: '/loginfail', failureFlash: false }), function(req,res){
		res.send(req.user);
	});
	app.get('/auth/twitter',
	passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', 
	passport.authenticate('twitter', { failureRedirect: '/login' }),
	function(req, res) {
    res.redirect('/');
	});
	app.get('/loginfail', function(req,res){
		res.send({});
	});
	
	app.get('/signupfail', function(req,res)
	{
		res.send({});
	});
    
    app.post('/test', function(req,res){

    	res.send(req.body);
    });
    
    app.post('/addimage', function(req,res){
		
		var newImage = new Image();
		newImage.url = req.body.url;
		newImage.title = req.body.title;
		newImage.username = req.user.local.username;
		newImage.pinusers = [req.user.local.username];
		
		newImage.save(function(err){
			if(err) throw err;
			Image.find({}, function(err,data){
				if(err) throw err;
				res.send(data);
			})
		})
			
    	
    });
    
    app.post('/adduserimage', function(req,res){
		
		var newImage = new Image();
		newImage.url = req.body.url;
		newImage.title = req.body.title;
		newImage.username = req.user.local.username;
		newImage.pinusers = [req.user.local.username];
		
		newImage.save(function(err){
			if(err) throw err;
			Image.find({'username':req.user.local.username}, function(err,data){
				if(err) throw err;
				res.send(data);
			})
		})
			
    	
    });
    
    app.post('/pinimage', function(req,res){

			Image.find({'_id':req.body.id}, function(err,data){
				if(err) throw err;
				if(data[0].pinusers.indexOf(req.user.local.username)==-1){
					Image.findOneAndUpdate({'_id':req.body.id},{$push: {pinusers: req.user.local.username}},{new:true}, function(err,data){
						if(err) throw err;
						if(req.body.user==''){
							Image.find({},function(err,data){
								if(err) throw err;
								res.send(data);
							});
						}
						else{
							Image.find({'pinusers':req.body.user},function(err,data){
								if(err) throw err;
								res.send(data);
							});
						}
					});
				}
				else{
					Image.findOneAndUpdate({'_id':req.body.id},{$pull: {pinusers: req.user.local.username}},{new:true}, function(err,data){
						if(err) throw err;

						if(data.pinusers.length==0){
							Image.find({'_id':req.body.id}).remove().exec(function(err,data){
								if(err) throw err;
								if(req.body.user==''){
								Image.find({},function(err,data){
								if(err) throw err;
								res.send(data);
							});
						}
						else{
							Image.find({'pinusers':req.body.user},function(err,data){
								if(err) throw err;
								res.send(data);
							});
						}
							});
						}
						else{
							if(req.body.user==''){
							Image.find({},function(err,data){
								if(err) throw err;
								res.send(data);
							});
						}
						else{
							Image.find({'pinusers':req.body.user},function(err,data){
								if(err) throw err;
								res.send(data);
							});
							}
						}
					});
				}
			})
			
    	
    });
    
    
    app.get('/getimages', function(req,res){

    	Image.find({}, function(err,data){
    		if(err) throw err;
    		res.send(data);
    	});
    	
    });
    
    app.post('/getuserimages', function(req,res){

    	Image.find({'pinusers':req.body.user}, function(err,data){
    		if(err) throw err;
    		res.send(data);
    	});
    	
    });
    
    
    app.post('/data', function(req,res){
    	User.find({},function(err,data){
    		if(err)throw err;
    	});
    	res.end();
    });
    
    app.post('/deletedata', function(req,res){
    	User.find({}).remove().exec();
    	res.end();
    });

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.end();
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

};