import axiosService from '../configs/axiosService';

export const getPosts = () => {
    return axiosService.get(
        `${process.env.REACT_APP_API_ENDPOINT}/get-post-custom-new?posts_on_page=3&page=1&sort=DESC`
    );
};

export const search = (key) => {
    return axiosService.get(
            `${process.env.REACT_APP_API_ENDPOINT}/search-user-post-titletype?key=${key}`
    );
};