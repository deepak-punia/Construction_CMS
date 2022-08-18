import { API_ENDPOINT } from "./types";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  loading: true,
  userdetails: null,
  allusers: null,
  error: null,
};

export const getUserWithId = createAsyncThunk(
  "api/getUserWithId",
  async ({ id }) => {
    const response = await axios.get(`${API_ENDPOINT}/api/users/user/${id}`);
    return response.data;
  }
);

export const getAllUsers = createAsyncThunk("api/getAllUsers", async () => {
  const response = await axios.get(`${API_ENDPOINT}/api/users/users`);
  return response.data;
});

export const deleteUser = createAsyncThunk(
  "api/deleteUser",
  async ({ id }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${API_ENDPOINT}/api/users/user/${id}`,
      config
    );
    return response.data;
  }
);

export const updatePicturesStyles = createAsyncThunk(
  "api/updatePicturesStyles",
  async ({ style }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${API_ENDPOINT}/api/customizations/pictures/style/${style}`,
      config
    );
    return response.data;
  }
);

export const togglePromotions = createAsyncThunk(
  "api/togglePromotions",
  async ({ style }) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${API_ENDPOINT}/api/customizations/promotion/${style}`,
      config
    );
    return response.data;
  }
);

export const settings = createSlice({
  name: "getUserWithId",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserWithId.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getUserWithId.fulfilled, (state, action) => {
        state.loading = false;
        state.userdetails = action.payload;
      })
      .addCase(getUserWithId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error in getUserWithId");
      })
      .addCase(getAllUsers.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.allusers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error in getAllUsers");
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error in deleteUser");
      })
      .addCase(updatePicturesStyles.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePicturesStyles.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updatePicturesStyles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error in updatePicturesStyles");
      })
      .addCase(togglePromotions.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(togglePromotions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(togglePromotions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error in togglePromotions");
      });
  },
});

export default settings.reducer;
