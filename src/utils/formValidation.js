export const validateUsername = (username) => {
  username = username.trim();
  let validationErrors = "";
  if (!username) {
    validationErrors += "Username is required. ";
  }

  if (username.length < 5 || username.length > 15) {
    validationErrors += "Username must be between 5 - 15 characters long. ";
  }

  return validationErrors;
};

export const validateName = (name) => {
  name = name.trim();
  let validationErrors = "";

  if (!name) {
    validationErrors += "Name is required. ";
  }

  if (name.length < 3 || name.length > 20) {
    validationErrors += "Name must be between 3 - 20 characters long. ";
  }

  return validationErrors;
};

export const validateEmail = (email) => {
  email = email.trim();
  let validationErrors = "";

  if (!email) {
    validationErrors += "Email is required. ";
  }

  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!regex.test(email)) {
    validationErrors += "Invalid email format.";
  }

  return validationErrors;
};

export const validatePassword = (password) => {
  password = password.trim();
  let validationErrors = "";

  if (!password) {
    validationErrors += "Password is required. ";
  }

  if (password.length < 6 || password.length > 20) {
    validationErrors +=
      "Password should have length between 6 - 20 characters. ";
  }

  // matches a string that has at least one uppercase, one lower case and one number.
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;

  if (!regex.test(password)) {
    validationErrors +=
      "Password should contain 1 uppercase, 1 lowercase, and 1 number.";
  }

  return validationErrors;
};

export const validatePasswordConfirm = (passwordConfirm, password) => {
  let validationErrors = "";
  passwordConfirm = passwordConfirm.trim();

  if (!passwordConfirm) {
    validationErrors += "Please confirm your password. ";
  }

  if (password !== passwordConfirm) {
    validationErrors += "Passwords do not match. ";
  }

  return validationErrors;
};

export const validateRegister = (formDetails) => {
  const { name, username, email, password, passwordConfirm } = formDetails;
  const newInputErrors = {
    name: validateName(name),
    username: validateUsername(username),
    email: validateEmail(email),
    password: validatePassword(password),
    passwordConfirm: validatePasswordConfirm(passwordConfirm, password),
  };

  return newInputErrors;
};

export const validateSignIn = (formDetails) => {
  const { email, password } = formDetails;
  const newInputErrors = {
    email: validateEmail(email),
    password: validatePassword(password),
  };

  return newInputErrors;
};
