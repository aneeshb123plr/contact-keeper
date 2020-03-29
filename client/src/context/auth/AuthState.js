import React, { useReducer } from "react";
import AuthContext from "./authContext";
import authReducer from "./authReducer";
import axios from "axios";
import setAuthToken from "../../utils/setAuthToken";
import {
  REEGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_ERROR,
  LOAD_USER,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from "../types";

const AuthState = props => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    user: null,
    error: null
  };
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Register

  const register = async formData => {
    const config = {
      headers: {
        ContentType: "application/json"
      }
    };
    try {
      const res = await axios.post("/api/users/", formData, config);
      dispatch({
        type: REEGISTER_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAILURE,
        payload: err.response.data.msg
      });
    }
  };

  // Login
  const login = async formData => {
    const config = {
      headers: {
        ContentType: "application/json"
      }
    };
    try {
      const res = await axios.post("/api/auth/", formData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAILURE,
        payload: err.response.data.msg
      });
    }
  };

  // Load user

  const loadUser = async () => {
    // set token in global headers
    if (localStorage.getItem("token")) {
      setAuthToken(localStorage.getItem("token"));
    }

    try {
      const res = await axios.get("/api/auth/");

      dispatch({
        type: LOAD_USER,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err.response.data.msg
      });
    }
  };

  // clear Error

  const clearError = () => {
    dispatch({
      type: CLEAR_ERROR
    });
  };

  // logout

  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
        register,
        clearError,
        loadUser,
        login,
        logout
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
