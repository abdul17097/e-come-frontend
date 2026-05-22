import { createSlice } from "@reduxjs/toolkit";

const LOCAL_KEY_USER = "auth_user";
const LOCAL_KEY_TOKEN = "auth_token";

const loadFromStorage = () => {
  try {
    const user = JSON.parse(localStorage.getItem(LOCAL_KEY_USER));
    const token = localStorage.getItem(LOCAL_KEY_TOKEN);
    return { user, token };
  } catch {
    return { user: null, token: null };
  }
};

const saveToStorage = (user, token) => {
  localStorage.setItem(LOCAL_KEY_USER, JSON.stringify(user));
  localStorage.setItem(LOCAL_KEY_TOKEN, token);
};

const clearStorage = () => {
  localStorage.removeItem(LOCAL_KEY_USER);
  localStorage.removeItem(LOCAL_KEY_TOKEN);
};

const { user: persistedUser, token: persistedToken } = loadFromStorage();

const initialState = {
  user: persistedUser ?? null,
  token: persistedToken ?? null,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoading = false;
      state.error = null;
      saveToStorage(user, token);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isLoading = false;
      clearStorage();
    },
  },
});

export const { setLoading, setError, clearError, setCredentials, logout } =
  authSlice.actions;

// useSelector((state) => state.auth.user)
// useSelector(selectCurrentUser)

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) =>
  !!state.auth.token && !!state.auth.user;
export const selectIsAdmin = (state) => state.auth.user?.role === "admin";
export const selectAuthLoading = (state) => state.auth.isLoading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
