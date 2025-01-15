import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (params, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get("/users", { params });
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (id, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await axios.get(`/users/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/users/${item._id}`, item);
      dispatch(fetchUsers());
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/users/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateMe = createAsyncThunk(
  "users/updateMe",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.put(`/users/updateMe`, item);
      await AsyncStorage.setItem("user", JSON.stringify(item));
      Alert.alert("Success", "Profile Updated Successfully");
      return res.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  users: [],
  user: {},
  loading: false,
  error: null,
  count: 0,
};

const UserSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.users = action.payload.data;
      state.count = action.payload.count;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      FireToast("success", "User Updated Successfully");
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    });
  },
});

export const { startLoading } = UserSlice.actions;
export default UserSlice.reducer;
