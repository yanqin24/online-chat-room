import { fetchLogin, fetchLogout, fetchOnlineUsers, fetchChatList, fetchAddChat } from './services';
import render, {generateChatHistoryHtml, generateOnlineUsersHtml, refreshChatHistoryHtml, refreshOnlineUsersHtml} from './render';
import state, { setError, waitOnLogin, login, logout, setOnlineUsers, setChatHistory, waitOnContents } from './state';
import { MESSAGES } from './constants';

let intervalId = null;

export function addAbilityLogin({ state, appEl }) {
    appEl.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('login__form')) {
            return;
        }
        e.preventDefault();
        const username = appEl.querySelector('.login__username').value;
        waitOnLogin();
        render({ state, appEl });
        fetchLogin(username)
            .then(response => {
                login(response.username);
                return fetchOnlineUsers();
            })
            .then(onlineUsers => {
                setOnlineUsers(onlineUsers);
                return fetchChatList();
            })
            .then(chatHistory => {
                setChatHistory(chatHistory);
                render({ state, appEl });
                startAutoRefresh({ state, appEl });
            })
            .catch(err => {
                setError(err?.error || 'ERROR');
                render({ state, appEl });
            });
    });
}



export function addAbilityLogout({ state, appEl }) {
    appEl.addEventListener('click', (e) => {
        if (!e.target.classList.contains('button__logout')) {
            return;
        }

        stopAutoRefresh();
        logout();
        render({ state, appEl });

        fetchLogout()
            .catch(err => {
                setError(err?.error || 'Logout failed');
                render({ state, appEl });
            });
    });
}


export function addAbilitySendMessage({ state, appEl }) {
    appEl.addEventListener('submit', (e) => {
        if (!e.target.classList.contains('send__messages__form')) {
            return;
        }
        e.preventDefault();
        const messageInput = appEl.querySelector('.input__message');
        const message = messageInput.value.trim();


        fetchAddChat(message)
        .then(updatedChatHistory => {
            setChatHistory(updatedChatHistory);
            render({ state, appEl });
        })
        .catch(err => {
            setError(err?.error || 'ERROR');
            render({ state, appEl });
        });

    });
}


function startAutoRefresh({ state, appEl }) {
    if (intervalId) {
        clearInterval(intervalId);
    }

    intervalId = setInterval(() => {
        fetchOnlineUsers()
            .then(onlineUsers => {
                setOnlineUsers(onlineUsers);
                const onlineUsersEl = document.querySelector('.online__users__list');
                if (onlineUsersEl) {
                    onlineUsersEl.innerHTML = refreshOnlineUsersHtml(state);
                }
                return fetchChatList();
            })
            .then(chatHistory => {
                setChatHistory(chatHistory);
            const chatHistoryEl = document.querySelector('.chat__history__list');
            if (chatHistoryEl) {
                chatHistoryEl.innerHTML = refreshChatHistoryHtml(state);
            }


        })
        .catch(err => {
            setError(err?.error || 'ERROR');
            render({ state, appEl });
        });
}, 5000);
}

function stopAutoRefresh() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

