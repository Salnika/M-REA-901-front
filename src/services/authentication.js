import _ from 'lodash';

class Authentication {
  static save(user) {
    _.map(_.keys(user), key => {
      localStorage.setItem(`user.${key}`, user[key]);
    });
  }

  static getToken() {
    return localStorage.getItem('user.token');
  }

  static getUser() {}

  static logout() {
    localStorage.clear();
  }
}

export default Authentication;