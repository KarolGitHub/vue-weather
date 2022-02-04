export const nameRules = [
  (v) => !!v || 'Name is required',
  (v) => (v && v.length <= 10) || 'Name must be less than 10 characters'
];
export const passwordRules = [
  (v) => !!v || 'Password is required',
  (v) =>
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
    'Password must contain at least lowercase letter, one number, a special character and one uppercase letter'
];
export const emailRules = [
  (v) => !!v || 'E-mail is required',
  (v) =>
    /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v
    ) || 'E-mail must be valid'
];
