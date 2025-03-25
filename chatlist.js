"use strict";

const uuid = require('crypto').randomUUID;

function makeChatList() {
    let messageCounter = 3;
    const chatList = {
        chatTexts: {
            1: { id: 1, sender: "Shane", text: "Hey everyone! What's up?" },
            2: { id: 2, sender: "Carl", text: "Just finished my project. Feeling great!" },
            3: { id: 3, sender: "Rick", text: "Anyone up for a gaming session later?" }
        },

        getChatTexts() {
            return this.chatTexts;
        },

        addChatText(sender, text) {
            const newId = ++messageCounter;
            this.chatTexts[newId] = { id: newId, sender, text };
            return this.chatTexts;
        }
    };

    return chatList;
}

const chatHistory = makeChatList();

module.exports = chatHistory;

