import {combineReducers} from 'redux';
import joggingTimes from './joggingTimeReducer';
import joggingTimesByUser from './joggingTimesByUserReducer';
import registrationResult from './registrationReducer';
import loginResult from './loginReducer';
import passwordChangingResult from './passwordChangingReducer';
import passwordChangingByUserResult from './passwordChangingByUserReducer';
import users from './usersReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import avgSpeedPerWeek from './avgSpeedReportReducer';
import authInfo from './authenticationReducer';

const rootReducer = combineReducers({
  joggingTimes,
  joggingTimesByUser,
  registrationResult,
  loginResult,
  passwordChangingResult,
  passwordChangingByUserResult,
  users,
  ajaxCallsInProgress,
  avgSpeedPerWeek,
  authInfo
});

export default rootReducer;
