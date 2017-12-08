'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var User = require('../models/users');
var Image = require('../models/images');

module.exports = function (app, passport, googleBooks) {
//Image.find({}).remove().exec();
//Book.find({}).remove().exec();
	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(function (req, res) {
			res.sendFile(path + '/dev/index.html');
		});
		
	app.post('/createnewuser', passport.authenticate('local-signup',{ failureRedirect: '/signupfail', failureFlash: false }), function(req,res){
		console.log("authentication successful");
		console.log(req.body.email);
		User.findOneAndUpdate({'local.username':req.body.username},{'local.email':req.body.email},{new:true}, function(err,data){
			if(err)throw err;
			var userData = {
				email: data.local.email,
				username: data.local.username
			};
			console.log("USER DATA: "+JSON.stringify(userData));
			res.send(userData);
		});
	});
	
	app.post('/login', passport.authenticate('local-login', { failureRedirect: '/loginfail', failureFlash: false }), function(req,res){

		User.find({'local.username':req.user.local.username}, function(err,data){
			if(err)throw err;
			console.log(JSON.stringify(data));
			var userData = {
				email: req.user.local.email,
				username: req.user.local.username,
			};
			console.log("USER DATA: "+JSON.stringify(req.user));
			res.send(userData);
		});
	});
	app.get('/loginstatus', function(req,res){
		console.log("LOGIN STATUS");
		console.log(req.user);
		console.log("undefined: "+(req.user==undefined));
		if(req.user==undefined){
			res.send({});
		}
		else{
			res.send(req.user);
		}
	});
	app.get('/twitterlogin', passport.authenticate('twitter', { failureRedirect: '/loginfail', failureFlash: false }), function(req,res){
		console.log(req.user);
		res.send(req.user);
	});
	app.get('/auth/twitter',
	passport.authenticate('twitter'));

	app.get('/auth/twitter/callback', 
	passport.authenticate('twitter', { failureRedirect: '/login' }),
	function(req, res) {
    // Successful authentication, redirect home.
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
    	console.log("Fetch request successful");
    	console.log(req.body);
    	res.send(req.body);
    });
    
    app.post('/addimage', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.url);
		
		var newImage = new Image();
//		newImage.url = req.body.url.replace(/http/,'https');
		newImage.url = req.body.url;
		console.log(newImage.url);
		newImage.title = req.body.title;
		newImage.username = req.user.local.username;
		newImage.pinusers = [req.user.local.username];
		
		newImage.save(function(err){
			if(err) throw err;
			Image.find({}, function(err,data){
				if(err) throw err;
				console.log(data);
				res.send(data);
			})
		})
			
    	
    });
    
    app.post('/adduserimage', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.url);
		
		var newImage = new Image();
//		newImage.url = req.body.url.replace(/http/,'https');
		newImage.url = req.body.url;
		console.log(newImage.url);
		newImage.title = req.body.title;
		newImage.username = req.user.local.username;
		newImage.pinusers = [req.user.local.username];
		
		newImage.save(function(err){
			if(err) throw err;
			Image.find({'username':req.user.local.username}, function(err,data){
				if(err) throw err;
				console.log(data);
				res.send(data);
			})
		})
			
    	
    });
    
    app.post('/pinimage', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.body.id);

			Image.find({'_id':req.body.id}, function(err,data){
				if(err) throw err;
				console.log(data);
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
						console.log("pull data");
						console.log(data);
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
    
    
    
    app.get('/getprofiledata', function(req,res){
    	console.log("Fetch request successful");
    	console.log(req.user.local.username);
    	
    	Book.find({'username':req.user.local.username}, function(err,data){
    		if(err) throw err;
    		console.log("username: "+req.user.local.username);
    		console.log(JSON.stringify(data));
    		res.send(data);
    	});
    	
    });
    
    app.get('/getimages', function(req,res){
    	console.log("Fetch request successful");

    	Image.find({}, function(err,data){
    		if(err) throw err;
    		console.log(JSON.stringify(data));
    		res.send(data);
    	});
    	
    });
    
    app.post('/getuserimages', function(req,res){
    	console.log("GET USER IMAGES");
		console.log(req.body.user);
    	Image.find({'pinusers':req.body.user}, function(err,data){
    		if(err) throw err;
    		console.log(JSON.stringify(data));
    		res.send(data);
    	});
    	
    });
    
    
    app.post('/data', function(req,res){
    	User.find({},function(err,data){
    		if(err)throw err;
    		console.log(data[0]);
    	});
    	res.end();
    });
    
    app.post('/deletedata', function(req,res){
    	User.find({}).remove().exec();
    	res.end();
    });

	app.route('/logout')
		.get(function (req, res) {
			console.log("Before logout: "+JSON.stringify(req.user));
			req.logout();
			console.log("After logout: "+JSON.stringify(req.user));
			res.end();
		});
		

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/twitter')
		.get(passport.authenticate('twitter'));

	app.route('/auth/twitter/callback')
		.get(passport.authenticate('twitter', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};