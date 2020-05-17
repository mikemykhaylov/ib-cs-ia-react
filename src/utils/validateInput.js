import firebase from './firebaseSetup';

const db = firebase.firestore();

const isEmail = (email) => {
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(emailRegEx);
};

export const validateUserCredentials = (user, signUp) => {
  const errors = {};
  if (signUp && user.password !== user.confirmPassword) {
    errors.confirmPassword = 'Passwords must match';
  }
  if (user.email && !isEmail(user.email)) {
    errors.email = 'Must be valid email address';
  }
  Object.keys(user).forEach((key) => {
    if (!user[key] || user[key].trim() === '') {
      errors[key] = 'Must not be empty';
    }
  });
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

export const validateCreateAppointment = async (appointment) => {
  const errors = {};
  let barber;
  if (appointment.barberID) {
    barber = await db.collection('barbers').doc(appointment.barberID).get();
    if (!barber.exists) {
      errors.barber = "The barber with a set id doesn't exist";
    }
  }
  if (appointment.email && !isEmail(appointment.email)) {
    errors.email = 'Must be valid email address';
  }
  if (appointment.time && Number.isNaN(new Date(appointment.time).getTime())) {
    errors.time = 'Must be valid time';
  }
  Object.keys(appointment).forEach((key) => {
    if (!appointment[key] || appointment[key].trim() === '') {
      errors[key] = 'Must not be empty';
    }
  });
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

export const validateGetAppointment = async (appointment) => {
  const errors = {};
  let barber;
  if (appointment.barberID) {
    barber = await db.collection('barbers').doc(appointment.barberID).get();
    if (!barber.exists) {
      errors.barber = "The barber with a set id doesn't exist";
    }
  }
  if (appointment.day && Number.isNaN(new Date(appointment.day).getTime())) {
    errors.day = 'Must be valid time';
  }
  if (!appointment.day) {
    errors.day = 'Must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

export const validateGetBarberForTime = (time) => {
  const errors = {};
  if (time && Number.isNaN(new Date(time).getTime())) {
    errors.time = 'Must be valid time';
  }
  if (!time) {
    errors.time = 'Must not be empty';
  }
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};
