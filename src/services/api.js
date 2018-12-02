import axios from 'axios';
import Authentication from './authentication';

class API {
  static getBaseUrl() {
    if (process.env.NODE_ENV === 'production') {
      return 'test.com';
    }
    return 'http://localhost:3020';
  }

  static getNoAuth() {
    const instance = axios.create({
      baseURL: API.getBaseUrl(),
      timeout: 300000,
      maxRedirects: 0,
    });
    return instance;
  }

  static get() {
    const instance = axios.create({
      baseURL: API.getBaseUrl(),
      timeout: 300000,
      maxRedirects: 0,
    });

    instance.defaults.headers.common.Authorization = Authentication.getToken();

    return instance;
  }
}

export default API;
