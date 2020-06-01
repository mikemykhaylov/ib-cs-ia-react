export const isEmail = (email) => {
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
  if (appointment.email && !isEmail(appointment.email)) {
    errors.email = 'Must be valid email address';
  }
  Object.keys(appointment).forEach((key) => {
    if (
      !appointment[key] ||
      (typeof appointment[key] === 'string' && appointment[key].trim() === '')
    ) {
      errors[key] = 'Must not be empty';
    }
  });
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};
