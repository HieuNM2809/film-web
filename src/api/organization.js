import axios from 'axios';
import axiosService from '../configs/axiosService';

export const getDetailOrganization = (id) => {
     return axiosService.get(
          `${process.env.REACT_APP_API_ENDPOINT}/organization/${id}`
     );
};

export const getOrganizations = () => {
     return axiosService.get(
          `${process.env.REACT_APP_API_ENDPOINT}/organization`
     );
};

export const getMemberInOrg = (data) => {
     return axiosService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/list-user-by-id-organizations`, data, null
     );
};

export const getOrgByUserId = (data) => {
     return axiosService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/list-organizations-by-id-user`, data, null
     );
};

export const createOrg = (data) => {
     return axiosService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/organization`, data, {
          headers: {
               'accept': 'application/json',
               "Content-Type": "multipart/form-data",
          },
     });
};

export const addMemberInOrg = (data) => {
     return axiosService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/user-organizations`, data, null
     );
};

export const editOrg = (data, id) => {
     return axios.post(
          `${process.env.REACT_APP_API_ENDPOINT}/organization/${id}`, data, {
          headers: {
               'accept': 'application/json',
               "Content-Type": "multipart/form-data",
          },
     });
};

export const deleteOrg = (id) => {
     return axiosService.delete(
          `${process.env.REACT_APP_API_ENDPOINT}/organization/${id}`
     );
};
