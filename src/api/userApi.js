import apiUtils from "./apiUtils";

class UserApi {

  static getAllUsers() {
    return apiUtils.callApiService('GET', 'user/getAll', null);
  }

  static createUser(user) {
    return apiUtils.callApiService('POST', '/user/create', user);
  }

  static updateUser(user) {
    return apiUtils.callApiService('PUT', '/user/update', user);
  }

  static deleteUser(user) {
    return apiUtils.callApiService('DELETE', '/user/delete', {user_id: user.user_id});
  }
}

export default UserApi;
