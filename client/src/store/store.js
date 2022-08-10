import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth';
import customSettingsReducer from '../reducers/customSettings';
import alertReducer from '../reducers/alert';

export default configureStore({
  reducer: {
    auth: authReducer,
    settings: customSettingsReducer,
    alert: alertReducer
  }
})