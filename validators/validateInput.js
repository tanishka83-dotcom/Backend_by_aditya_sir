const validateRegister = (data) => {
  const errors = {};
  const name = data.name ? data.name.trim() : '';
  const email = data.email ? data.email.trim() : '';
  const password = data.password ? data.password : '';

  if (!name) {
    errors.name = 'Name is required';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Email is invalid';
    }
  }

  if (!password) {
    errors.password = 'Password is required';
  } else if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

const validateLogin = (data) => {
  const errors = {};
  const email = data.email ? data.email.trim() : '';
  const password = data.password ? data.password : '';

  if (!email) {
    errors.email = 'Email is required';
  }

  if (!password) {
    errors.password = 'Password is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};

module.exports = {
  validateRegister,
  validateLogin,
};
