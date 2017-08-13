export default {
  joggingTimes: [],
  joggingTimesByUser: [],
  users: [],
  loginResult: {},
  passwordChangingResult: {},
  passwordChangingByUserResult: {},
  authInfo: {
    authenticated: !!sessionStorage.getItem('access_token'),
    expires_in: sessionStorage.getItem('expires_in') || 0},
  registrationResult: {},
  ajaxCallsInProgress: 0,
  avgSpeedPerWeek: []
};
