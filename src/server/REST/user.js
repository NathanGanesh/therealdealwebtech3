const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const users = require('../data/userData');
const StatusCodes = require('http-status-codes');
const jwt = require('jsonwebtoken');

// @route POST /register/
// @desc As a user I want to be able to register (email address and password)
// @acces Public
router.post('/', async (req, res) => {
	const { username, email, password } = req.body;

	if (username === undefined) {
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'Email or' +
				' username not filled in' });
	}
	if (email === undefined) {
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'Email or' +
				' username not filled in' });
	}
	if (password === undefined) {
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'Email or' +
				' username not filled in' });
	}

	let responseObject = [];
	let userExist = users.find((user) => {
		if (user.email === email) {
			return user;
		}
	});

	if (userExist !== undefined) {
		return res.status(StatusCodes.NOT_FOUND).json({ error: 'Email or username already exist' });
	} else {
		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		responseObject = {
			id: uuidv4(),
			username: username,
			password: hashedPassword,
			email: email,
			role: 'user'
		};
		console.log(hashedPassword);
		users.push(responseObject);

		return res.status(StatusCodes.OK).json({ ok: "User registered" });
	}
});

module.exports = router;
