// authMiddleware.js

// import { setUserInfo, logoutUser } from 'path-to-orebiActions/orebiActions';

const authMiddleware = (store) => (next) => (action) => {
  if (action.type === 'USER_FETCH_REQUESTED') {
    // Dispatch a loading action
    store.dispatch({ type: 'USER_LOADING' });

    // Simulate an API request
    fetch('/user')
      .then((response) => response.json())
      .then((data) => {
        if (data.user) {
          // If user exists, dispatch the action to set user info
          store.dispatch(setUserInfo(data.user));
        } else {
          // If no user, dispatch the action to logout
          store.dispatch(logoutUser());
        }

        // Dispatch a loading complete action
        store.dispatch({ type: 'USER_LOADING_COMPLETE' });
      });
  }

  return next(action);
};

export default authMiddleware;
