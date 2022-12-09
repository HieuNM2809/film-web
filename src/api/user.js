import axios from 'axios';
import axiosService from '../configs/axiosService';

export const getUserById = (id) => {
     return axiosService.get(
          `${process.env.REACT_APP_API_ENDPOINT}/user/${id}`
     );
};

export const editUser = (data, id) => {
     return axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/user/${id}`, data, {
          headers: {
               'accept': 'application/json',
               "Content-Type": "multipart/form-data",
          },
     });
};