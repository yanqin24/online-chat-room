import {MESSAGES} from './constants';

const state = {
    isLoginPending: true,
    isLogin: false,
    isContentPending: false,
    username: '',
    onlineUserList: {},
    chatHistory: {},
    error: ''    
};

export function waitOnLogin() {
    state.isLogin = false;
    state.isLoginPending = true;
    state.username = '';
    state.chatHistory= {};
    state.error = '';
}

export function waitOnContents() {
    state.chatHistory = {};
    state.isContentPending = true;
    state.error = '';
}

export function login(username){
    state.isLogin = true;
    state.isLoginPending = false;
    state.username = username;
    state.error = '';

}

export function logout(){
    state.isLogin = false;
    state.isLoginPending = false;
    state.username = '';
    state.error = '';
    state.chatHistory = {};

}

export function setOnlineUsers(onlineUserList) {
    state.onlineUserList = onlineUserList;
    state.error = '';
}

export function setChatHistory(chatHistory){
    state.chatHistory = chatHistory;
    state.isContentPending = false;
    state.error = '';
}

export function setError(error) { 
    if(!error) {
        state.error = '';
        return;
    }
    state.isLoginPending = false;
    state.isContentPending = false;
    state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;