import API from './api.js';

class Users {
  static list() {
    return API.get().get('/users');
  }

  static login(email, password) {
    return API.get().post('/users/login', { email, password });
  }

  static get() {}

  static create(email, password, username) {
    console.log({
      email,
      password,
      role: 'user',
      firstName: username,
      lastName: username,
    });
    return API.get().post('/users', {
      email,
      password,
      role: 'user',
      firstName: username,
      lastName: username,
    });
  }
}

export default Users;
