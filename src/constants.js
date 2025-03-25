
export const SERVER = {
    AUTH_MISSING: 'auth-missing',
    AUTH_INSUFFICIENT: 'auth-insufficient',
    REQUIRED_USERNAME: 'required-username',
    REQUIRED_TEXT: 'required-text'
};
  
export const CLIENT = {
    NETWORK_ERROR: 'networkError'
};
  
export const MESSAGES = {
    [CLIENT.NETWORK_ERROR]: 'Lost connection. Trying to reconnect...',
    [SERVER.AUTH_INSUFFICIENT]: '"dog" is not a valid username. Please try another one.',
    [SERVER.REQUIRED_USERNAME]: 'Please enter a username to login.',
    [SERVER.AUTH_MISSING]: 'Please enter a username to login.',
    [SERVER.REQUIRED_TEXT]: 'Message cannot be empty. Please enter message.',
    default: 'Something went wrong.  Please try again.'
};