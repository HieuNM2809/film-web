import axiosService from '../configs/axiosService';

export const getTopics = () => {
     return axiosService.get(
          `${process.env.REACT_APP_API_ENDPOINT}/title-type`
     );
};

export const getDetailTopic = (id) => {
     return axiosService.get(
          `${process.env.REACT_APP_API_ENDPOINT}/title-type/${id}`
     );
};