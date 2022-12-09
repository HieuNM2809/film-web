import axiosService from '../configs/axiosService';

export const getPostsSave = (data) => {
     return axiosService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/post/list-post-by-user`, data, null
     );
};

export const savePost = (data) => {
     return axiosService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/post/save-post-by-user`, data, null
     );
};

export const unsavePost = (data) => {
     return axiosService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/post/un-save-post-by-user`, data, null
     );
};

export const createPost = (data) => {
     return axiosService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/post`, data, {
          headers: {
               'accept': 'application/json',
               "Content-Type": "multipart/form-data",
          },
     });
};

export const createGroupPost = (data) => {
     return axiosService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/post/group-post`, data, {
          headers: {
               'accept': 'application/json',
               "Content-Type": "multipart/form-data",
          },
     });
};

export const getPostByTopicId = (data) => {
     return axiosService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/get-post-with-title`, data, null
     );
};

export const getPostByUserId = (data) => {
     return axiosService.post(
          `${process.env.REACT_APP_API_ENDPOINT}/get-post-with-user`, data, null
     );
};

export const getDetailPost = (id) => {
     return axiosService.get(
          `${process.env.REACT_APP_API_ENDPOINT}/post/${id}`
     );
};