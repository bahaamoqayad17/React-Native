import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../lib/axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const register = createAsyncThunk(
  "auth/register",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("auth/register", item);
      Alert.alert("Success", "Registration Successful");
      //   Router.push("/user");
      return res.data;
    } catch (error) {
      Alert.alert("Error", error.response.data.message);

      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (item, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post("auth/login", item);
      //   Router.push("/user");
      await AsyncStorage.setItem("token", res.data.token);
      await AsyncStorage.setItem("user", JSON.stringify(res.data.user));
      return res.data;
    } catch (error) {
      Alert.alert("Error", error.response.data.message);

      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  user: {},
  loading: false,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loading = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(register.fulfilled, (state, action) => {
      state.user = action.payload.data;
      state.error = null;
      state.loading = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      Alert.alert("Success", "Login Successful");
      state.user = action.payload.data;
      state.error = null;
      state.loading = false;
    });
  },
});

export const { startLoading } = AuthSlice.actions;
export default AuthSlice.reducer;
