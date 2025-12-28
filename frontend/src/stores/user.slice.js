// import { createSlice } from "@reduxjs/toolkit";

// /*----------------------Initial State----------------------*/
// const initialState = {
//   login: false,
//   userData: null,
//   courses: null,

//   userDataAvailable: false,
//   coursesAvailable: false,
// };

// /*----------------------record slice----------------------*/
// const userSlice = createSlice({
//   name: "record",
//   initialState,
//   reducers: {
//     setAuth: (state, action) => {
//       state.userData = action.payload;
//       state.login = true;
//     },
//     setLogout: (state) => {
//       state.login = false;
//     },

//     setUserData: (state, action) => {
//       state.userData = action.payload;
//       (state.userDataAvailable = true), (state.login = true);
//     },
//     getUserData: (state) => {
//       return state.userData;
//     },

//     setCourses: (state, action) => {
//       // console.log("===> ", action.payload.courses);
//       (state.courses = action.payload.courses), (state.coursesAvailable = true);
//     },
//     getCourses: (state) => {
//       return state.courses;
//     },
//   },
// });
// /* ✅ SELECTOR (PURE FUNCTION) */
// export const selectUserData = (state) => state.userSlice.userData;
// export const {
//   setAuth,
//   setCourses,
//   getCourses,
//   setUserData,
//   getUserData,
//   setLogout,
// } = userSlice.actions;

// export default userSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

/*---------------- Initial State ----------------*/
const initialState = {
  login: false,
  userData: null,
  courses: [],

  userDataAvailable: false,
  coursesAvailable: false,
};

/*---------------- Slice ----------------*/
const userSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.userData = action.payload;
      state.login = true;
      state.userDataAvailable = true;
    },

    setLogout: (state) => {
      state.login = false;
      state.userData = null;
      state.userDataAvailable = false;
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
      state.login = true;
      state.userDataAvailable = true;
    },

    setCourses: (state, action) => {
      state.courses = action.payload; // ✅ DIRECT array
      state.coursesAvailable = true;
    },
  },
});

/*---------------- SELECTORS (IMPORTANT) ----------------*/
// ✅ SELECTORS SHOULD BE OUTSIDE createSlice
export const selectUserData = (state) => state.userSlice.userData;
export const selectIsLogin = (state) => state.userSlice.login;
export const selectCourses = (state) => state.userSlice.courses;

/*---------------- EXPORTS ----------------*/
export const { setAuth, setUserData, setCourses, setLogout } =
  userSlice.actions;

export default userSlice.reducer;
