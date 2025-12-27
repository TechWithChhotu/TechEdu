import { createSlice } from "@reduxjs/toolkit";

/*----------------------Initial State----------------------*/
const initialState = {
  login: false,
  userData: null,
  courses: null,

  userDataAvailable: false,
  coursesAvailable: false,
};

/*----------------------record slice----------------------*/
const userSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.userData = action.payload;
      state.login = true;
    },
    setLogout: (state) => {
      state.login = false;
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
      (state.userDataAvailable = true), (state.login = true);
    },
    getUserData: (state) => {
      return state.userData;
    },

    setCourses: (state, action) => {
      // console.log("===> ", action.payload.courses);
      (state.courses = action.payload.courses), (state.coursesAvailable = true);
    },
    getCourses: (state) => {
      return state.courses;
    },
  },
});

export const {
  setAuth,
  setCourses,
  getCourses,
  setUserData,
  getUserData,
  setLogout,
} = userSlice.actions;

export default userSlice.reducer;
