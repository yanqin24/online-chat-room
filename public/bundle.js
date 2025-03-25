/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/constants.js":
/*!**************************!*\
  !*** ./src/constants.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CLIENT: () => (/* binding */ CLIENT),
/* harmony export */   MESSAGES: () => (/* binding */ MESSAGES),
/* harmony export */   SERVER: () => (/* binding */ SERVER)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var SERVER = {
  AUTH_MISSING: 'auth-missing',
  AUTH_INSUFFICIENT: 'auth-insufficient',
  REQUIRED_USERNAME: 'required-username',
  REQUIRED_TEXT: 'required-text'
};
var CLIENT = {
  NETWORK_ERROR: 'networkError'
};
var MESSAGES = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, CLIENT.NETWORK_ERROR, 'Lost connection. Trying to reconnect...'), SERVER.AUTH_INSUFFICIENT, '"dog" is not a valid username. Please try another one.'), SERVER.REQUIRED_USERNAME, 'Please enter a username to login.'), SERVER.AUTH_MISSING, 'Please enter a username to login.'), SERVER.REQUIRED_TEXT, 'Message cannot be empty. Please enter message.'), "default", 'Something went wrong.  Please try again.');

/***/ }),

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAbilityLogin: () => (/* binding */ addAbilityLogin),
/* harmony export */   addAbilityLogout: () => (/* binding */ addAbilityLogout),
/* harmony export */   addAbilitySendMessage: () => (/* binding */ addAbilitySendMessage)
/* harmony export */ });
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services */ "./src/services.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants */ "./src/constants.js");




var intervalId = null;
function addAbilityLogin(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('login__form')) {
      return;
    }
    e.preventDefault();
    var username = appEl.querySelector('.login__username').value;
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.waitOnLogin)();
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogin)(username).then(function (response) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.login)(response.username);
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchOnlineUsers)();
    }).then(function (onlineUsers) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setOnlineUsers)(onlineUsers);
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchChatList)();
    }).then(function (chatHistory) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setChatHistory)(chatHistory);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
      startAutoRefresh({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilityLogout(_ref2) {
  var state = _ref2.state,
    appEl = _ref2.appEl;
  appEl.addEventListener('click', function (e) {
    if (!e.target.classList.contains('button__logout')) {
      return;
    }
    stopAutoRefresh();
    (0,_state__WEBPACK_IMPORTED_MODULE_2__.logout)();
    (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
      state: state,
      appEl: appEl
    });
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchLogout)()["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'Logout failed');
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function addAbilitySendMessage(_ref3) {
  var state = _ref3.state,
    appEl = _ref3.appEl;
  appEl.addEventListener('submit', function (e) {
    if (!e.target.classList.contains('send__messages__form')) {
      return;
    }
    e.preventDefault();
    var messageInput = appEl.querySelector('.input__message');
    var message = messageInput.value.trim();
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchAddChat)(message).then(function (updatedChatHistory) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setChatHistory)(updatedChatHistory);
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
    });
  });
}
function startAutoRefresh(_ref4) {
  var state = _ref4.state,
    appEl = _ref4.appEl;
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(function () {
    (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchOnlineUsers)().then(function (onlineUsers) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setOnlineUsers)(onlineUsers);
      var onlineUsersEl = document.querySelector('.online__users__list');
      if (onlineUsersEl) {
        onlineUsersEl.innerHTML = (0,_render__WEBPACK_IMPORTED_MODULE_1__.refreshOnlineUsersHtml)(state);
      }
      return (0,_services__WEBPACK_IMPORTED_MODULE_0__.fetchChatList)();
    }).then(function (chatHistory) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setChatHistory)(chatHistory);
      var chatHistoryEl = document.querySelector('.chat__history__list');
      if (chatHistoryEl) {
        chatHistoryEl.innerHTML = (0,_render__WEBPACK_IMPORTED_MODULE_1__.refreshChatHistoryHtml)(state);
      }
    })["catch"](function (err) {
      (0,_state__WEBPACK_IMPORTED_MODULE_2__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
      (0,_render__WEBPACK_IMPORTED_MODULE_1__["default"])({
        state: state,
        appEl: appEl
      });
    });
  }, 5000);
}
function stopAutoRefresh() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   refreshChatHistoryHtml: () => (/* binding */ refreshChatHistoryHtml),
/* harmony export */   refreshOnlineUsersHtml: () => (/* binding */ refreshOnlineUsersHtml)
/* harmony export */ });
function render(_ref) {
  var state = _ref.state,
    appEl = _ref.appEl;
  var html = "\n    <main class=\"main\">\n        ".concat(generateLoginHtml(state), "\n        ").concat(generateErrorHtml(state), "\n        ").concat(generateChatRoomHtml(state), "\n    </main>");
  appEl.innerHTML = html;
}
function generateErrorHtml(state) {
  return "\n        <div class=\"error\">".concat(state.error, "</div>\n    ");
}
function generateLoginHtml(state) {
  if (state.isLoginPending) {
    return "\n            <div class=\"lgoin__pending\">Loading login page...</div>\n        ";
  }
  if (state.isLogin) {
    return '';
  }
  return "\n        <div class=\"login\">\n            <h1>Login</h1>\n            <form class=\"login__form\" action=\"#login\">\n                <label>\n                    <span>Username: </span>\n                    <input class=\"login__username\" value=\"\">\n                </label>\n                <button class=\"login__button\" type=\"submit\">Login</button>\n            </form>\n        </div>\n    ";
}
function generateChatRoomHtml(state) {
  if (!state.isLogin) {
    return "";
  }
  if (state.isContentPending) {
    return "\n        <div class=\"content\">\n            ".concat(generateOnlineUsersHtml(state), "\n            <p class=\"content__pending\">Loading Chat Room...</p>\n         <div>\n        ");
  }
  return "\n        <div class=\"content\">\n            <h1>Welcome, ".concat(state.username, "</h1>\n            ").concat(generateLogoutHtml(state), "\n            ").concat(generateOnlineUsersHtml(state), "\n            ").concat(generateChatHistoryHtml(state), "\n            ").concat(generateSendMessagesHtml(state), "\n\n        </div>\n    ");
}
function generateLogoutHtml() {
  return "\n        <div class=\"logout\">\n            <button class=\"button__logout\" type=\"submit\">Logout</button>\n        </div>\n    ";
}
function generateOnlineUsersHtml(state) {
  var users = Object.values(state.onlineUserList);
  if (users.length === 0) {
    return '';
  }
  var usersList = users.map(function (username) {
    return "\n        <li class=\"user\">".concat(username, "</li>\n    ");
  }).join('');
  return usersList ? "\n        <div class=\"online__user__list\">\n            <h2>Online Users</h2>\n            <ul class=\"online__users__list\">".concat(usersList, "</ul>\n        </div> ") : "";
}
function refreshOnlineUsersHtml(state) {
  var users = Object.values(state.onlineUserList);
  if (users.length === 0) {
    return '';
  }
  var usersList = users.map(function (username) {
    return "\n        <li class=\"user\">".concat(username, "</li>\n    ");
  }).join('');
  return usersList ? "<ul class=\"online__users__list\">".concat(usersList, "</ul> ") : "";
}
function generateChatHistoryHtml(state) {
  if (!state.chatHistory || Object.keys(state.chatHistory).length === 0) {
    return '';
  }
  var chatHistoryList = Object.values(state.chatHistory).map(function (chat) {
    return "\n        <li class=\"user__chats\">".concat(chat.sender, ": ").concat(chat.text, "</li>\n    ");
  }).join('');
  return "\n        <div class=\"chat__history\">\n            <h2>Messages</h2>\n            <ul class=\"chat__history__list\">".concat(chatHistoryList, "</ul>\n        </div>");
}
function refreshChatHistoryHtml(state) {
  if (!state.chatHistory || Object.keys(state.chatHistory).length === 0) {
    return '';
  }
  var chatHistoryList = Object.values(state.chatHistory).map(function (chat) {
    return "\n        <li class=\"user__chats\">".concat(chat.sender, ": ").concat(chat.text, "</li>\n    ");
  }).join('');
  return "<ul class=\"chat__history__list\">".concat(chatHistoryList, "</ul>");
}
function generateSendMessagesHtml(state) {
  return "\n     <form class=\"send__messages__form\" action=\"#send\">\n        <label class=\"label__message\" for=\"send__messages\">Input Message:</label>\n        <input class=\"input__message\" id=\"send__messages\">\n        <button type=\"submit\" class=\"button__send__messages\">Send</button>\n    ";
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (render);

/***/ }),

/***/ "./src/services.js":
/*!*************************!*\
  !*** ./src/services.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fetchAddChat: () => (/* binding */ fetchAddChat),
/* harmony export */   fetchChatList: () => (/* binding */ fetchChatList),
/* harmony export */   fetchLogin: () => (/* binding */ fetchLogin),
/* harmony export */   fetchLogout: () => (/* binding */ fetchLogout),
/* harmony export */   fetchOnlineUsers: () => (/* binding */ fetchOnlineUsers),
/* harmony export */   fetchSession: () => (/* binding */ fetchSession),
/* harmony export */   fetchUpdateChat: () => (/* binding */ fetchUpdateChat)
/* harmony export */ });
function fetchLogin(username) {
  return fetch('/api/v1/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchLogout() {
  return fetch('/api/v1/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchSession() {
  return fetch('/api/v1/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchOnlineUsers() {
  return fetch('/api/v1/userlist')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchChatList() {
  return fetch('/api/v1/chatlist')["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchUpdateChat(id, updatedChat) {
  return fetch('/api/v1/chatlist', {
    method: 'PATCH',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      updatedChat: updatedChat
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}
function fetchAddChat(text) {
  return fetch('/api/v1/chatlist', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      text: text
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'networkError'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }
    return response.json()["catch"](function (error) {
      return Promise.reject({
        error: error
      });
    }).then(function (err) {
      return Promise.reject(err);
    });
  });
}

/***/ }),

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   login: () => (/* binding */ login),
/* harmony export */   logout: () => (/* binding */ logout),
/* harmony export */   setChatHistory: () => (/* binding */ setChatHistory),
/* harmony export */   setError: () => (/* binding */ setError),
/* harmony export */   setOnlineUsers: () => (/* binding */ setOnlineUsers),
/* harmony export */   waitOnContents: () => (/* binding */ waitOnContents),
/* harmony export */   waitOnLogin: () => (/* binding */ waitOnLogin)
/* harmony export */ });
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");

var state = {
  isLoginPending: true,
  isLogin: false,
  isContentPending: false,
  username: '',
  onlineUserList: {},
  chatHistory: {},
  error: ''
};
function waitOnLogin() {
  state.isLogin = false;
  state.isLoginPending = true;
  state.username = '';
  state.chatHistory = {};
  state.error = '';
}
function waitOnContents() {
  state.chatHistory = {};
  state.isContentPending = true;
  state.error = '';
}
function login(username) {
  state.isLogin = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}
function logout() {
  state.isLogin = false;
  state.isLoginPending = false;
  state.username = '';
  state.error = '';
  state.chatHistory = {};
}
function setOnlineUsers(onlineUserList) {
  state.onlineUserList = onlineUserList;
  state.error = '';
}
function setChatHistory(chatHistory) {
  state.chatHistory = chatHistory;
  state.isContentPending = false;
  state.error = '';
}
function setError(error) {
  if (!error) {
    state.error = '';
    return;
  }
  state.isLoginPending = false;
  state.isContentPending = false;
  state.error = _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES[error] || _constants__WEBPACK_IMPORTED_MODULE_0__.MESSAGES["default"];
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/constants.js");
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./state */ "./src/state.js");
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./render */ "./src/render.js");
/* harmony import */ var _controller__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./controller */ "./src/controller.js");
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./services */ "./src/services.js");





var appEl = document.querySelector('#app');
(0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_controller__WEBPACK_IMPORTED_MODULE_3__.addAbilityLogin)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_controller__WEBPACK_IMPORTED_MODULE_3__.addAbilityLogout)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
(0,_controller__WEBPACK_IMPORTED_MODULE_3__.addAbilitySendMessage)({
  state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
  appEl: appEl
});
checkForSession();
function checkForSession() {
  (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchSession)().then(function (session) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.login)(session.username);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
    return (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchOnlineUsers)();
  }).then(function (onlineUsers) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setOnlineUsers)(onlineUsers);
    return (0,_services__WEBPACK_IMPORTED_MODULE_4__.fetchChatList)();
  }).then(function (chatHistory) {
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setChatHistory)(chatHistory);
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  })["catch"](function (err) {
    if ((err === null || err === void 0 ? void 0 : err.error) === _constants__WEBPACK_IMPORTED_MODULE_0__.SERVER.AUTH_MISSING) {
      (0,_state__WEBPACK_IMPORTED_MODULE_1__.logout)();
      (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
        state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
        appEl: appEl
      });
      return;
    }
    (0,_state__WEBPACK_IMPORTED_MODULE_1__.setError)((err === null || err === void 0 ? void 0 : err.error) || 'ERROR');
    (0,_render__WEBPACK_IMPORTED_MODULE_2__["default"])({
      state: _state__WEBPACK_IMPORTED_MODULE_1__["default"],
      appEl: appEl
    });
  });
}
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map