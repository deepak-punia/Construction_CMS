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

export const updatePromo = createAsyncThunk(
  "api/updatePromo",
  async ({ title, details }) => {
    const body = JSON.stringify({ title, details });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${API_ENDPOINT}/api/customizations/promotion/update`,
      body,
      config
    );
    return response.data;
  }
);

export const addReview = createAsyncThunk(
  "api/addReview",
  async ({name,details,position }) => {
    const body = JSON.stringify({ name, details, position });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${API_ENDPOINT}/api/customizations/review`,
      body,
      config
    );
    return response.data;
  }
);

export const deleteReview = createAsyncThunk(
  "api/deleteReview",
  async ({ id }) => {

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${API_ENDPOINT}/api/customizations/review/${id}`,
      config
    );
    return response.data;
  }
);


export const addGridPicture = createAsyncThunk(
  "api/addGridPicture",
  async (formData) => {
    const response = await axios.post(
      `${API_ENDPOINT}/api/customizations/pictures/grid`,
      formData
    );
    return response.data;
  }
);

export const deleteGridPicture = createAsyncThunk(
  "api/deleteGridPicture",
  async ({id }) => {
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${API_ENDPOINT}/api/customizations/pictures/delete/grid/${id}`,
      config
    );
    return response.data;
  }
);

export const addSliderPicture = createAsyncThunk(
  "api/addSliderPicture",
  async (formData) => {
    const response = await axios.post(
      `${API_ENDPOINT}/api/customizations/pictures/slider`,
      formData
    );
    return response.data;
  }
);

export const deleteSliderPicture = createAsyncThunk(
  "api/deleteSliderPicture",
  async ({id }) => {
    
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await axios.post(
      `${API_ENDPOINT}/api/customizations/pictures/delete/slider/${id}`,
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
      })
      .addCase(updatePromo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updatePromo.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(updatePromo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error in updatePromo");
      })
      .addCase(addReview.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error in addReview");
      })
      .addCase(deleteReview.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteReview.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error in deleteReview");
      })
      .addCase(addGridPicture.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addGridPicture.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addGridPicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error in addGridPicture");
      })
      .addCase(deleteGridPicture.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteGridPicture.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteGridPicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error in deleteGridPicture");
      })
      .addCase(deleteSliderPicture.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteSliderPicture.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(deleteSliderPicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error in deleteSliderPicture");
      })
      .addCase(addSliderPicture.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addSliderPicture.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(addSliderPicture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("error in addSliderPicture");
      });
  },
});

export default settings.reducer;
