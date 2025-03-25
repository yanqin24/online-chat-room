"use strict";

const sessions =require('./sessions');
const users = require('./users');
const chatlist = require('./chatlist');


const authController = {};



authController.checkSession = function (req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    res.json({ username });
};


authController.createSession = function (req, res) {
    const { username } = req.body;
    if (!users.isValid(username)) {
        res.status(400).json({error: 'required-username' });
        return;
    }
    if (!users.isPermitted(username)) {
        res.status(403).json({ error: 'auth-insufficient' });
        return;
    }

    const sid = sessions.addSession(username);
    res.cookie('sid', sid);
    res.json({ username });


};

authController.endSession = function(req,res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid):'';

    if(sid) {
        res.clearCookie('sid');
    }

    if(username) {
        sessions.deleteSession(sid);
    }

    res.json({username});
};

module.exports = authController;