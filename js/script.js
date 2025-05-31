const signUp = document.getElementById("signUpForm");
const userName = document.getElementById("name");
const userEmail = document.getElementById("userEmail");
const userPass = document.getElementById("userPassword");
const SignUpBtn = document.getElementById("registerBtn");
const login = document.getElementById("LoginForm");
const error = document.getElementById("errorMsg");
const success = document.getElementById("successMsg");
/* SignUp Form */
signUp?.addEventListener("submit", (e) => {
  e.preventDefault();
  name = userName.value;
  email = userEmail.value;
  password = userPass.value;
  const userData = {
    name,
    email,
    password,
  };
  const users = JSON.parse(localStorage.getItem("user")) || [];
  users.push(userData);
  localStorage.setItem("user", JSON.stringify(users));

  window.location.href = "Html/login.html";
  resetForm();
});

const resetForm = () => {
  if (userName) userName.value = "";
  if (userEmail) userEmail.value = "";
  if (userPass) userPass.value = "";
};
/*__________________________________________________________ */
/* Login Form */
const showAlert = (element, message) => {
  element.textContent = message;
  element.classList.remove("d-none");
  element.classList.add("fade-in");

  setTimeout(() => {
    element.classList.add("show");
  }, 10);

  setTimeout(() => {
    element.classList.remove("show");
    setTimeout(() => {
      element.classList.add("d-none");
      element.classList.remove("fade-in");
      element.textContent = "";
    }, 500);
  }, 3000);
};
login?.addEventListener("submit", (e) => {
  e.preventDefault();
  const emailInput = userEmail.value;
  const passwordInput = userPass.value;
  const userData = JSON.parse(localStorage.getItem("user")) || [];
  const userFound = userData.find((user) => {
    return user.email === emailInput;
  });

  if (!userFound) {
    showAlert(error, "Email Not Found");
  } else if (userFound.password !== passwordInput) {
    showAlert(error, "Incorrect Password"); 
  } else {
    showAlert(success, "Logged in successfully");
  window.location.href='../Html/home.html';
  }
  // resetForm();
});

/*__________________________________________________ */

