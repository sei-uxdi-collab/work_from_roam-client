export const emailTest = (email, emailAvail) => {
  return email.includes('@') && !emailAvail
}
export const emailValid = (email) => {
  return email.includes('@')
}
export const usernameTest = (username, usernameTaken) => {
  return username.length >= 6 && !usernameTaken
}
export const usernameLength = (username) => {
  return username.length >= 6
}
export const passwordTest = (password) => {
  const re = /^(?=.*\d)(?=.*[A-Z])(?=.*[@#$!%&*(),.?":{}|<>^+=])(?!.*[^a-zA-Z0-9@#$!%&*(),.?":{}|<>^+=])(.{8,35})$/
  return re.test(password)
}
export const passwordCapital = (password) => {
  const re = /^(?=.*[A-Z])/
  return re.test(password)
}
export const passwordLower = (password) => {
  const re = /^(?=.*[a-z])/
  return re.test(password)
}
export const passwordSpecial = (password) => {
  const re = /^(?=.*[@#$!%&*(),.?":{}|<>^+=])/
  return re.test(password)
}
export const passwordNumber = (password) => {
  const re = /^(?=.*[0-9])/
  return re.test(password)
}
export const passwordLength = (password) => {
  return password.length >= 8
}
export const passwordConfirmationTest = (pw, pw2) => {
  return pw === pw2
}
