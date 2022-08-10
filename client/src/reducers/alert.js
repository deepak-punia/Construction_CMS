import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = [];
  
export const setAlert = (params) => async (dispatch) => {
    await dispatch(setAlert1(params))
    return setTimeout(() => dispatch(removeAlert({id:params.id})),5000);
  }

  export const alert = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        setAlert1(state, action){
            return [...state, action.payload];
            
        },
        removeAlert(state, action){
            return state.filter((alert) => alert.id !== action.payload.id);
            
        }
    }
  });
  
  export const { setAlert1, removeAlert} = alert.actions;
  export default alert.reducer;