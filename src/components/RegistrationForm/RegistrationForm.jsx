import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, FormControl, TextField, Button, Grid } from '@mui/material';
import style from './RegistrationForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateFormData,
  updateValidationReqs,
  clearValidationReqs,
} from '../../redux/validation/validationSlice';
import ValidationPopup from '../ValidationPopup/ValidationPopup';

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const [validationPopups, setValidationPopups] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [focusedField, setFocusedField] = useState(null);
  const toggleValidationPopup = (fieldName, visible) => {
    setValidationPopups({ ...validationPopups, [fieldName]: visible });
  };

  const validationReqs = useSelector((state) => state.validation.validationReqs);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    dispatch(updateFormData({ [name]: value }));

    // Update the validation requirements dynamically
    if (value.trim() !== '') {
      dispatch(updateValidationReqs({ [name]: value }));
    }

    toggleValidationPopup(name, true);

    // Hide the validation popups for other fields
    Object.keys(validationPopups).forEach((field) => {
      if (field !== name) {
        toggleValidationPopup(field, false);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ... Rest of your handleSubmit logic

    // Update the validation requirements when the form is submitted
    Object.keys(formData).forEach((field) => {
      if (formData[field].trim() !== '') {
        dispatch(updateValidationReqs({ [field]: formData[field] }));
      }
    });
  };

  const renderValidationPopup = () => {
    return (
      <ValidationPopup
        validationData={validationReqs[focusedField]}
        visible={!!focusedField}
      />
    );
  };

  return (
    <Box sx={{ width: '100%' }} className={style.form_container}>
      <Grid align="center">
        {/* registration form */}
        <h2
          style={{
            color: '#FC842D',
            margin: '40px',
            fontFamily: 'Verdana',
            fontSize: '14px',
            fontWeight: '700',
          }}
        >
          REGISTER
        </h2>
        <FormControl variant="standard">
          <form onSubmit={handleSubmit} noValidate>
            <TextField
              variant="standard"
              label={'Name *'}
              type="text"
              name="name"
              fullWidth
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              error={!!formData.name && validationReqs.name.some((req) => !req.met)}

              helperText={
                validationReqs.name.some((req) => !req.met)
                  ? validationReqs.name.find((req) => !req.met).message
                  : ''
              }
            />

            <TextField
              variant="standard"
              label={'Email *'}
              type="email"
              name="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              error={!!formData.name && validationReqs.name.some((req) => !req.met)}

              helperText={
                validationReqs.email.some((req) => !req.met)
                  ? validationReqs.email.find((req) => !req.met).message
                  : ''
              }
            />

            <TextField
              variant="standard"
              label={'Password *'}
              type="password"
              name="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField('password')}
              onBlur={() => setFocusedField(null)}
              error={!!formData.name && validationReqs.name.some((req) => !req.met)}

              helperText={
                validationReqs.password.some((req) => !req.met)
                  ? validationReqs.password.find((req) => !req.met).message
                  : ''
              }
            />
            <Box sx={{ marginTop: '20px', paddingBottom: '20px' }}>
              <Button variant="contained" type="submit" className={style.register_button}>
                Register
              </Button>
            </Box>
          </form>
        </FormControl>

        {renderValidationPopup()}

        <Box sx={{ marginTop: '20px', paddingBottom: '20px' }}>
          <Link to="/Login">
            <Button variant="contained" className={style.login_button}>
              Log In
            </Button>
          </Link>
        </Box>
      </Grid>
    </Box>
  );
};

export default RegistrationForm;
