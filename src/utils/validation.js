export const getUsernameValidation = (username) => {
    return username === "emilys" 
      ? { isValid: true, message: "" } 
      : { isValid: false, message: "Username Incorrect" };
  };
  
  export const getEmailValidation = (email) => {
    const invalidChars = ["$", "#", "%", "^", "&", "*", " "];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    if (email === "") {
      return { isValid: false, message: "Email cannot be empty." };
    }
  
    if (!email.includes("@")) {
      return { isValid: false, message: "Email must contain '@' symbol." };
    }
  
    if (!email.includes(".")) {
      return { isValid: false, message: "Email must contain '.' after '@'." };
    }
  
    if (invalidChars.some(char => email.includes(char))) {
      return { isValid: false, message: "Email can only contain alphanumeric characters, '.', '-'" };
    }
  
    if (!emailRegex.test(email)) {
      return { isValid: false, message: "Email has an invalid format." };
    }
  
    return { isValid: true, message: "" };
  };

  export const getPasswordValidation = (password) => {
    if (password.length < 8) {
      return { isValid: false, message: "Password must be at least 8 characters long." };
    }
  
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[!@#$%^&*()_+~`|}{[\]:;?><,./-]/.test(password);
  
    if (!hasUppercase) {
      return { isValid: false, message: "Password must contain at least one uppercase letter." };
    }
  
    if (!hasLowercase) {
      return { isValid: false, message: "Password must contain at least one lowercase letter." };
    }
  
    if (!hasNumber) {
      return { isValid: false, message: "Password must contain at least one number." };
    }
  
    if (!hasSymbol) {
      return { isValid: false, message: "Password must contain at least one symbol." };
    }
  
    return { isValid: true, message: "" };
  };