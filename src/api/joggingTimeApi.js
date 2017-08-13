import apiUtils from "./apiUtils";

class JoggingTimeApi {
  static getAllJoggingTimes(filter) {
    return apiUtils.callApiService('POST', 'joggingTime/getAll', filter);
  }

  static getJoggingTimesByUser(user, dateRangeFilter) {
    return apiUtils.callApiService('POST', 'joggingTime/getByUser', {
      user_id: user.user_id,
      from: dateRangeFilter.from,
      to: dateRangeFilter.to
    });
  }

  static createJoggingTime(joggingTime) {
    return apiUtils.callApiService('POST', 'joggingTime/create', joggingTime);
  }

  static createJoggingTimeForUser(joggingTime, user) {
    joggingTime.user_id = user.user_id;
    return apiUtils.callApiService('POST', 'joggingTime/createForUser', joggingTime);
  }

  static updateJoggingTime(joggingTime) {
    return apiUtils.callApiService('PUT', 'joggingTime/update', joggingTime);
  }


  static updateJoggingTimeForUser(joggingTime, user) {
    joggingTime.user_id = user.user_id;
    return apiUtils.callApiService('PUT', 'joggingTime/updateForUser', joggingTime);
  }

  static deleteJoggingTime(joggingTime) {
    return apiUtils.callApiService('DELETE', 'joggingTime/delete', joggingTime, {
      jogging_times_id: joggingTime.jogging_times_id
    });
  }

  static deleteJoggingTimeForUser(joggingTime, user) {
    return apiUtils.callApiService('DELETE', 'joggingTime/deleteForUser', {
      jogging_times_id: joggingTime.jogging_times_id,
      user_id: user.user_id
    });
  }

  static loadAvgSpeedReport() {
    return apiUtils.callApiService('GET', 'joggingTime/report/perWeek', null);
  }
}

export default JoggingTimeApi;
