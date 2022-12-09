import axios from 'axios';

class AxiosService {
  constructor() {
    const instance = axios.create({
      baseURL: process.env.API_ENDPOINT,
      timeout: 20000,
      headers: {
        Accept: 'application/json'
      }
    });
    instance.interceptors.response.use(this.handleSuccess, this.handleError);
    this.instance = instance;
  }
  setToken(token) {
    this.instance.defaults.headers.common['Authorization'] = token;
  }
  deleteToken() {
    delete this.instance.defaults.headers.common['Authorization'];
  }
  handleSuccess(response) {
    return response;
  }
  handleError(error) {
    return Promise.reject(error);
  }
  get(url, params, option) {
    return this.instance.get(url, {
      ...option,
      params: {
        ...params
      }
    });
  }

  delete(url, data, option) {
    return this.instance.delete(url, {
      ...option,
      data
    });
  }

  put(url, data, option) {
    return this.instance.put(url, data, {
      ...option
    });
  }
  post(url, data, option) {
    return this.instance.post(url, data, {
      ...option
    });
  }

  patch(url, data, option) {
    return this.instance.patch(url, data, {
      ...option
    });
  }
}

const axiosService = new AxiosService();
export default axiosService;
