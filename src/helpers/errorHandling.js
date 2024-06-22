export function throwError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  throw error;
}

export function verify_field(field, message, statusCode) {
  if (!field) {
    throwError(message, statusCode);
  }
}

export function verify_user_exists(user, message, statusCode) {
  if (user) {
    throwError(message, statusCode);
  }
}

export function verify_passwords_match(password, confirmPassword) {
  if (password !== confirmPassword) {
    const error = new Error("Passwords do not match");
    error.statusCode = 422;
    throw error;
  }
}
