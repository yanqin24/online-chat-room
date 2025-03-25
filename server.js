"use strict";

const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json()); 

const authController = require('./auth-controller');
const chatController = require('./chat-controller');

app.get('/api/v1/session', authController.checkSession);
app.post('/api/v1/session', authController.createSession);
app.delete('/api/v1/session', authController.endSession);

app.get('/api/v1/chatlist',chatController.getChatList);
app.post('/api/v1/chatlist', chatController.addChat);
app.patch('/api/v1/chatlist', chatController.addChat);

app.get('/api/v1/userlist', chatController.getOnlineUsers);


app.listen(PORT, () => console.log(`http://localhost:${PORT}`));