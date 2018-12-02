import API from './api';

class Users {
  static list() {
    return API.get().get('/users');
  }

  static login(email, password) {
    return API.get().post('/users/login', { email, password });
  }

  static get() {}

  static create(email, password, username) {
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
