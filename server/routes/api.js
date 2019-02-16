/*jshint esversion: 6 */

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const mongoose = require('mongoose');
const db = "mongodb://user1:password1@ds127115.mlab.com:27115/authdb";

mongoose.connect(db, err => {
	if (err) {
		console.error('Error! ' + err);
	} else {
		console.log('Connection successful');
	}
});

router.get('/', (req, res) => {
	res.send('From API route');
});

router.post('/register', (req, res) => {
	let userData = req.body;
	let user = new User(userData);
	user.save((error, registeredUser) => {
		if (error) {
			console.log(error);
		} else {
			let payload = {
				subject: registeredUser._id
			};
			let token = jwt.sign(payload, 'sskey');
			res.status(200).send({
				token
			});
		}
	});
});

router.post('/login', (req, res) => {
	let userData = req.body;

	User.findOne({
		email: userData.email
	}, (error, user) => {
		if (error) {
			console.log(error);
		} else {
			if (!user) {
				res.status(401).send('Invalid email');
			} else if (user.password !== userData.password) {
				res.status(401).send('Invalid password');
			} else {
				let payload = {
					subject: user._id
				};
				let token = jwt.sign(payload, 'sskey');
				res.status(200).send({token});
			}
		}
	});
});

router.get('/events', (req, res) => {
	let events = [{
			"_id": "1",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "2",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "3",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "4",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "5",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "6",
			"name": "Auto Expo",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		}
	];
	res.json(events);
});

router.get('/special', (req, res) => {
	let specialEvents = [{
			"_id": "1",
			"name": "Auto Expo Special",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "2",
			"name": "Auto Expo Special",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "3",
			"name": "Auto Expo Special",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "4",
			"name": "Auto Expo Special",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "5",
			"name": "Auto Expo Special",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		},
		{
			"_id": "6",
			"name": "Auto Expo Special",
			"description": "lorem ipsum",
			"date": "2012-04-23T18:25:43.511Z"
		}
	];
	res.json(specialEvents);
});

module.exports = router;