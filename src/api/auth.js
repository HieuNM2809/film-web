import axios from 'axios';
import axiosService from '../configs/axiosService';
import { loginFailed, loginStart, loginSuccess, logoutFailed, logoutStart, logoutSuccess, registerFailed, registerStart, registerSuccess } from '../redux/authSlice';
import { getUserFailed, getUserSuccess, logoutUserSuccess, } from '../redux/userSlice';

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/login`, user, null
        );
        dispatch(loginSuccess(res.data.data.access_token));
        dispatch(getUserSuccess(res.data.data.profile));
        navigate('/home');
    } catch (err) {
        dispatch(loginFailed());
    }
};

export const registerUser = async (user, dispatch, navigate) => {
    dispatch(registerStart());
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/register`, user, null
        );
        dispatch(registerSuccess(res.data));
        navigate('/login');
    } catch (err) {
        dispatch(registerFailed());
    }
};

export const logOut = async (dispatch, id, navigate, accessToken) => {

    dispatch(logoutStart());
    try {
        await axios.post(`${process.env.REACT_APP_API_ENDPOINT}/logout`, id, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        dispatch(logoutSuccess());
        dispatch(logoutUserSuccess());
        navigate("/home");
    } catch (error) {
        dispatch(logoutFailed());
    }
};

export const getDataUser = async (token, dispatch) => {
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_ENDPOINT}/me`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        dispatch(getUserSuccess(res.data));
    } catch (err) {
        dispatch(getUserFailed());
    }
};

export const changePass = (data) => {
    return axiosService.post(
        `${process.env.REACT_APP_API_ENDPOINT}/change-pass`, data, null
    );
};