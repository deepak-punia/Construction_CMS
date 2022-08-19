import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../reducers/auth';
import customSettingsReducer from '../reducers/customSettings';
import alertReducer from '../reducers/alert';
import appointments from '../reducers/appointments';
import settings from '../reducers/settings';

export default configureStore({
  reducer: {
    devTools: process.env.NODE_ENV !== 'production',
    auth: authReducer,
    settings: customSettingsReducer,
    alert: alertReducer,
    appointments,
    admin: settings
  }
})