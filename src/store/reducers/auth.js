import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: null,
  authRedirectPath: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { error: null, loading: true });
    case actionTypes.AUTH_SUCCESS:
      return authSucces(state, action);
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { loading: false, error: action.error });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { userId: null, token: null });
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return updateObject(state, { authRedirectPath: action.path });
    default:
      return state;
  }
};

const authSucces = (state, action) => {
  return updateObject(state, {
    error: null,
    loading: false,
    token: action.idToken,
    userId: action.userId,
  });
};

export default reducer;
