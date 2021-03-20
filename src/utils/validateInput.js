import i18n from '../i18n/i18n';

export const isEmail = (email) => {
  const emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(emailRegEx);
};

export const validateCreateAppointment = async (appointment) => {
  const errors = {};
  if (appointment.email && !isEmail(appointment.email)) {
    errors.email = i18n.t('Must be valid email address');
  }
  if (appointment.phoneNumber && !appointment.phoneNumber.match(/^\+\d+$/)) {
    errors.phoneNumber = i18n.t('Must be valid phone number');
  }
  Object.keys(appointment).forEach((key) => {
    if (
      !appointment[key] ||
      (typeof appointment[key] === 'string' && appointment[key].trim() === '')
    ) {
      errors[key] = i18n.t('Must not be empty');
    }
  });
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};

export const validateCreateBarber = async (appointment) => {
  const errors = {};
  if (appointment.email && !isEmail(appointment.email)) {
    errors.email = i18n.t('Must be valid email address');
  }
  Object.keys(appointment).forEach((key) => {
    if (
      !appointment[key] ||
      (typeof appointment[key] === 'string' && appointment[key].trim() === '')
    ) {
      errors[key] = i18n.t('Must not be empty');
    }
  });
  return {
    errors,
    valid: Object.keys(errors).length === 0,
  };
};
