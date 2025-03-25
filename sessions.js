"use strict";

const uuid = require('crypto').randomUUID;

const sessions = {};
const userSessions = {};

function addSession(username){
    const sid = uuid();
    sessions[sid] = { username };

    if (!userSessions[username]){
        userSessions[username]=[];
    }
    userSessions[username].push(sid);
    return sid;
};

function getSessionUser(sid) {
    return sessions[sid]?.username;
}


function deleteSession(sid) {
    const username = sessions[sid]?.username;
    if (username) {
        userSessions[username] = userSessions[username].filter(id => id !== sid);
        if (userSessions[username].length === 0) {
            delete userSessions[username];
        }
    }
    delete sessions[sid];
}

function getUsersSessions(username){
    return userSessions[username] || [];

}

function getOnlineUsers(){
    const onlineUsers = Object.values(sessions)
    .map(session => session.username)
    .filter((username, index, self) => username && self.indexOf(username) === index);
return onlineUsers;
}


module.exports = {
    addSession,
    deleteSession,
    getSessionUser,
    getUsersSessions,
    getOnlineUsers
};