
function render({ state, appEl }) {
    const html = `
    <main class="main">
        ${ generateLoginHtml( state ) }
        ${ generateErrorHtml( state ) }
        ${ generateChatRoomHtml(state) }
    </main>`;
    appEl.innerHTML = html;
}

function generateErrorHtml(state) {
    return `
        <div class="error">${state.error}</div>
    `;
}

function generateLoginHtml( state ) {
    if (state.isLoginPending) {
        return `
            <div class="lgoin__pending">Loading login page...</div>
        `;
    }
    if(state.isLogin) {
        return '';
    }
    return `
        <div class="login">
            <h1>Login</h1>
            <form class="login__form" action="#login">
                <label>
                    <span>Username: </span>
                    <input class="login__username" value="">
                </label>
                <button class="login__button" type="submit">Login</button>
            </form>
        </div>
    `;
}

function generateChatRoomHtml (state) {
    if(!state.isLogin) {
        return ``;
    }
    if (state.isContentPending) {
        return `
        <div class="content">
            ${generateOnlineUsersHtml( state )}
            <p class="content__pending">Loading Chat Room...</p>
         <div>
        `
    }
    return `
        <div class="content">
            <h1>Welcome, ${state.username}</h1>
            ${generateLogoutHtml( state )}
            ${generateOnlineUsersHtml( state )}
            ${generateChatHistoryHtml( state )}
            ${generateSendMessagesHtml( state )}

        </div>
    `;
}

function generateLogoutHtml(  ){
    return `
        <div class="logout">
            <button class="button__logout" type="submit">Logout</button>
        </div>
    `;
}

function generateOnlineUsersHtml( state ) {
    const users = Object.values(state.onlineUserList);

    if (users.length === 0) {
        return '';
    }

    const usersList = users.map(username => `
        <li class="user">${username}</li>
    `).join('');

    return  usersList ? `
        <div class="online__user__list">
            <h2>Online Users</h2>
            <ul class="online__users__list">${usersList}</ul>
        </div> `: ``;
}

export function refreshOnlineUsersHtml(state) {
    const users = Object.values(state.onlineUserList);

    if (users.length === 0) {
        return '';
    }

    const usersList = users.map(username => `
        <li class="user">${username}</li>
    `).join('');

    return  usersList ? `<ul class="online__users__list">${usersList}</ul> `: ``;
}


function generateChatHistoryHtml(state) {
    if (!state.chatHistory || Object.keys(state.chatHistory).length === 0) {
        return '';
    }

    const chatHistoryList = Object.values(state.chatHistory).map(chat => `
        <li class="user__chats">${chat.sender}: ${chat.text}</li>
    `).join('');

    return `
        <div class="chat__history">
            <h2>Messages</h2>
            <ul class="chat__history__list">${chatHistoryList}</ul>
        </div>`;
}

export function refreshChatHistoryHtml(state) {
    if (!state.chatHistory || Object.keys(state.chatHistory).length === 0) {
        return '';
    }

    const chatHistoryList = Object.values(state.chatHistory).map(chat => `
        <li class="user__chats">${chat.sender}: ${chat.text}</li>
    `).join('');

    return `<ul class="chat__history__list">${chatHistoryList}</ul>`;
}


function generateSendMessagesHtml(state){
    return `
     <form class="send__messages__form" action="#send">
        <label class="label__message" for="send__messages">Input Message:</label>
        <input class="input__message" id="send__messages">
        <button type="submit" class="button__send__messages">Send</button>
    `;
}


export default render;