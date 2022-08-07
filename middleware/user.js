const express = require("express");
const jwt = require("jsonwebtoken");
const CS_users = require("../models/users");
const config = require("config");

const user = async (req, res, next) => {
	const token = req.header("x-auth-token");

	//handling error
	//if no token is sent
	if (!token) {
		return res.status(401).json({ msg: "No token, Access denied" });
	}
    //decoding token
	try {
		const secretkay = config.get("SECRET_KEY");
		var decoded = jwt.verify(token, secretkay);
		req.user = decoded.email;
		next();
	} catch (err) {
		return res.status(401).json({ msg: "Invalid Token, Access denied" });
	}
};

module.exports = user;