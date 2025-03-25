"use strict";

const chatlist = require('./chatlist');
const sessions = require('./sessions');
const users = require('./users');

const chatController = {};

chatController.getChatList = function(req, res) {
    const sid = req.cookies.sid;
    const username = sid? sessions.getSessionUser(sid):'';
    const chatHistory = chatlist.getChatTexts();

    if(!sid || !users.isValid(username)){
        res.status(401).json({ error: 'auth-missing'});
        return ;
    }
    res.json(chatHistory);
}

chatController.addChat = function(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const { text } = req.body;
    if (!text) {
        res.status(400).json({ error: 'required-text' });
        return;
    }

    chatlist.addChatText(username, text);
    const chatHistory = chatlist.getChatTexts();
    res.json(chatHistory);
};

chatController.getOnlineUsers = function(req, res) {
    const sid = req.cookies.sid;
    const username = sid ? sessions.getSessionUser(sid) : '';

    if (!sid || !users.isValid(username)) {
        res.status(401).json({ error: 'auth-missing' });
        return;
    }

    const onlineUsers = sessions.getOnlineUsers();
    res.json({ onlineUsers });
};


module.exports = chatController;