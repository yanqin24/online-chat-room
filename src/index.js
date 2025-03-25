import { SERVER, CLIENT } from './constants';
import state, {login, logout, setOnlineUsers, setChatHistory, addChatHistory, setError} from './state';
import render from './render';
import { addAbilityLogin,
  addAbilityLogout,
  addAbilitySendMessage
} from './controller';
import { fetchLogin,
  fetchLogout,
  fetchSession,
  fetchOnlineUsers,
  fetchChatList,
  fetchUpdateChat,
  refreshChats,
  refreshOnlineUsers,
 } from './services';

const appEl = document.querySelector('#app');
render( {state, appEl});
addAbilityLogin({state, appEl});
addAbilityLogout({state, appEl});
addAbilitySendMessage({state, appEl});
checkForSession();

function checkForSession() {
  fetchSession()
    .then(session => {
      login(session.username);
      render({ state, appEl });
      return fetchOnlineUsers();
    })
    .then(onlineUsers => {
        setOnlineUsers(onlineUsers);
        return fetchChatList();
    })
    .then(chatHistory => {
        setChatHistory(chatHistory);
        render({ state, appEl });
    })
    .catch(err => {
      if (err?.error === SERVER.AUTH_MISSING) {
        logout();
        render({ state, appEl });
        return;
      }
      setError(err?.error || 'ERROR');
      render({ state, appEl });
    });
}



