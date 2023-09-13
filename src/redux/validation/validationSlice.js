import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  validationReqs: {
    name: [
      { req1: { id: 1, message: 'Between 7-20 alphanumeric characters', met: false } },
      { req2: { id: 2, message: 'No special characters', met: true } },
    ],
    password: [
      { req1: { id: 1, message: 'Between 8-20 alphanumeric characters', met: false } },
      { req2: { id: 2, message: 'At least 1 capital letter', met: false } },
      { req3: { id: 3, message: 'At least 1 number', met: false } },
      { req4: { id: 4, message: 'At least 1 special character', met: false } },
      { req5: { id: 5, message: 'No spaces', met: true } },
    ],
    email: [
      { req1: { id: 1, message: 'Valid email address', met: false } },
    ],
  },
  formData: {
    name: '',
    password: '',
    email: '',
  },
};

export const validationSlice = createSlice({
  name: 'validation',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      const formField = Object.keys(action.payload)[0];
      const fieldValue = Object.values(action.payload)[0];

      state.formData = {
        ...state.formData,
        [formField]: fieldValue,
      };
    },
    clearFormData: (state, action) => {
      state.formData = {
        name: '',
        password: '',
        email: '',
      }
    },
    updateValidationReqs: (state, action) => {
      const formField = Object.keys(action.payload)[0];
      const fieldValue = Object.values(action.payload)[0];

      switch (formField) {
        case 'name':
          state.validationReqs.name.forEach(item => {
            const reqKey = Object.keys(item)[0];
            const req = item[reqKey];

            switch (reqKey) {
              case 'req1':
                req.met = fieldValue.length >= 7 && fieldValue.length <= 20;
                break;
              case 'req2':
                req.met = !/[^\w\s]/.test(fieldValue);
                break;
              default:
                break;
            }
          });
          break;

        case 'password':
          state.validationReqs.password.forEach(item => {
            const reqKey = Object.keys(item)[0];
            const req = item[reqKey];

            switch (reqKey) {
              case 'req1':
                req.met = fieldValue.length >= 8 && fieldValue.length <= 20;
                break;
              case 'req2':
                req.met = /[A-Z]/.test(fieldValue);
                break;
              case 'req3':
                req.met = /\d/.test(fieldValue);
                break;
              case 'req4':
                req.met = /[^A-Za-z0-9]/.test(fieldValue);
                break;
              case 'req5':
                req.met = !/\s/.test(fieldValue);
                break;
              default:
                break;
            }
          });
          break;

        case 'email':
          state.validationReqs.email.forEach(item => {
            const reqKey = Object.keys(item)[0];
            const req = item[reqKey];
            req.met = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValue);
          });
          break;
        default:
          break;
      }
    },
    clearValidationReqs: (state, action) => {
      state.validationReqs = initialState.validationReqs;
    },
  }
});


export const { updateFormData, clearFormData, updateValidationReqs, clearValidationReqs } = validationSlice.actions;
export const validationReducer = validationSlice.reducer;