"use strict";

const users = {};
const sessions =require('./sessions');

function isValid(username) {
    let isValid = true;
    isValid = !!username && username.trim();
    isValid = isValid && username.match(/^[A-Za-z0-9_]+$/);
    return isValid;
}

function isPermitted(username) {
    return username !=='dog';
}

function getUserName(username) {
    return users[username];
}

function getActiveUserSessions(username){
    return sessions.getUsersSessions(username).length;
}

module.exports = {
    isValid,
    isPermitted,
    getUserName,
    getActiveUserSessions
};

