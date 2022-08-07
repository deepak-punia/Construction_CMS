const express = require("express");
const jwt = require("jsonwebtoken");
const CS_users = require("../models/users");
const config = require("config");

const admin = async(req, res, next) => {
	
	try {
		
        const user = await CS_users.findOne({email:req.user}).select("-password");
        if(user.role !== config.get("ROLE.ADMIN")){
            throw new Error;
        }
		next();
	} catch (err) {
		return res.status(401).json({ msg: "Only Admin can access this API, Access denied" });
	}
};

module.exports = admin;