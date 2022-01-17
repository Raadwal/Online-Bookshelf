document.addEventListener("DOMContentLoaded", init);

// Black from css to restore default after alert
const blackColor = "#1d1d1b";
const whiteColor = "#ffffff";

const buttonAddBook = document.getElementById("button-add-book");
const buttonUpdateBook = document.getElementById("button-update-book");
const buttonRemoveBook = document.getElementById("button-remove-book");
const buttonShowCharts = document.getElementById("button-show-charts");
const buttonLoginUser = document.getElementById("button-login-user");
const buttonRegisterUser = document.getElementById("button-register-user");

const buttonCloseAddBook = document.getElementById("backdrop-add-book-close");
const buttonCloseLoginUser = document.getElementById(
  "backdrop-login-user-close"
);
const buttonCloseRegisterUser = document.getElementById(
  "backdrop-register-user-close"
);

const buttonSubmitFormAddBook = document.getElementById("submit-form-add-book");
const buttonSubmitFormLoginUser = document.getElementById(
  "submit-form-login-user"
);
const buttonSubmitFormRegisterUser = document.getElementById(
  "submit-form-register-user"
);

function init() {
  // Navigation buttons
  buttonAddBook.addEventListener("click", () => {
    document.getElementById("backdrop-add-book").style.display = "block";
  });

  buttonUpdateBook.addEventListener("click", () => {
    console.log("Update Book");
  });

  buttonRemoveBook.addEventListener("click", () => {
    console.log("Remove Book");
  });

  buttonShowCharts.addEventListener("click", () => {
    console.log("Show Charts");
  });

  buttonLoginUser.addEventListener("click", () => {
    document.getElementById("backdrop-login-user").style.display = "block";
  });

  buttonRegisterUser.addEventListener("click", () => {
    document.getElementById("backdrop-register-user").style.display = "block";
  });

  // Closing form without saving
  buttonCloseAddBook.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("backdrop-add-book").style.display = "none";
  });

  buttonCloseLoginUser.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("backdrop-login-user").style.display = "none";
  });

  buttonCloseRegisterUser.addEventListener("click", (event) => {
    event.preventDefault();
    document.getElementById("backdrop-register-user").style.display = "none";
  });

  // Adding data do database

  buttonSubmitFormAddBook.addEventListener("click", (event) => {
    event.preventDefault();
    const form = document.getElementById("form-add-book");

    if (validateAndSendAddBookFormData()) {
      console.log("Add Book Form OK");
    }
  });

  buttonSubmitFormLoginUser.addEventListener("click", (event) => {
    event.preventDefault();
    validateAndSendLoginUserFormData();
  });

  buttonSubmitFormRegisterUser.addEventListener("click", (event) => {
    event.preventDefault();
    validateAndSendRegisterUserFormData();
  });
}

function setInputAlert(input, message) {
  input.style.background = "rgba(255, 0, 0, 0.25)";
  input.style.border = "solid 1px red";
  input.value = "";
  input.placeholder = message;
}

function setInputDefault(input) {
  input.style.background = whiteColor;
  input.style.border = "solid 1px " + blackColor;
  input.placeholder = "";
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function validateAndSendAddBookFormData() {
  let formIsOK = true;

  const title = document.getElementById("add-book-title"); // done
  const author = document.getElementById("add-book-author"); // done
  const genre = document.getElementById("add-book-genre"); // done
  const pages = document.getElementById("add-book-pages"); // done
  const status = document.getElementById("add-book-status"); // done
  const score = document.getElementById("add-book-score"); // done

  // ==================== Title ====================
  if (title.value === "") {
    formIsOK = false;
    setInputAlert(title, "This field cannot be empty!");
  } else {
    setInputDefault(title);
  }

  // ==================== Author ====================
  if (author.value === "") {
    formIsOK = false;
    setInputAlert(author, "This field cannot be empty!");
  } else {
    setInputDefault(author);
  }

  // ==================== Genre ====================
  if (genre.value === "") {
    formIsOK = false;
    setInputAlert(genre, "This field cannot be empty!");
  } else {
    setInputDefault(genre);
  }

  // ==================== Pages ====================
  if (!(pages.value === "")) {
    if (!isNaN(pages.value)) {
      if (Number.isInteger(Number(pages.value)) && Number(pages.value) > 0) {
        setInputDefault(pages);
      } else {
        formIsOK = false;
        setInputAlert(pages, "It has to be a positive integer!");
      }
    } else {
      formIsOK = false;
      setInputAlert(pages, "It has to be a positive integer!");
    }
  } else {
    formIsOK = false;
    setInputAlert(pages, "It has to be a positive integer!");
  }

  // ==================== Status ====================
  if (status.value != -1 && status.value != 0 && status.value != 1) {
    formIsOK = false;
    status.style.background = "rgba(255, 0, 0, 0.25)";
    status.style.border = "solid 1px red";
  } else {
    setInputDefault(status);
  }

  // ==================== Score ====================
  if (status.value == 1) {
    if (!(score.value === "")) {
      if (!isNaN(score.value)) {
        if (
          Number.isInteger(Number(score.value)) &&
          Number(score.value) >= 0 &&
          Number(score.value) <= 10
        ) {
          setInputDefault(score);
        } else {
          formIsOK = false;
          setInputAlert(score, "Score between 0 and 10!");
        }
      } else {
        formIsOK = false;
        setInputAlert(score, "Score between 0 and 10!");
      }
    } else {
      formIsOK = false;
      setInputAlert(score, "Score between 0 and 10!");
    }
  } else {
    setInputDefault(score);
    score.value = "None";
  }

  if (formIsOK) {
    console.log("TO-DO: Send data to the server!");
  }
}

function validateAndSendLoginUserFormData() {
  let formIsOK = true;

  const email = document.getElementById("login-user-email"); // done
  const password = document.getElementById("login-user-password"); // done

  // ==================== Email ====================
  if (email.value === "") {
    formIsOK = false;
    setInputAlert(email, "Email field cannot be empty!");
  } else {
    if (!validateEmail(email.value)) {
      formIsOK = false;
      setInputAlert(email, "Incorrect email!");
    } else {
      setInputDefault(email);
    }
  }

  // ==================== Password ====================
  if (password.value === "") {
    formIsOK = false;
    setInputAlert(password, "Password field cannot be empty!");
  } else {
    setInputDefault(password);
  }

  if (formIsOK) {
    console.log("TO-DO: Send login to the server!");
  }
}

function validateAndSendRegisterUserFormData() {
  let formIsOK = true;

  const name = document.getElementById("register-user-name"); // done
  const email = document.getElementById("register-user-email"); // done
  const password = document.getElementById("register-user-password"); // done
  const passwordRepeated = document.getElementById(
    "register-user-password-repeated"
  ); // done

  // ==================== Name ====================
  if (name.value.length < 3) {
    formIsOK = false;
    setInputAlert(name, "Name is too short!");
  } else {
    setInputDefault(name);
  }

  // ==================== Email ====================
  if (!validateEmail(email.value)) {
    formIsOK = false;
    setInputAlert(email, "Incorrect email!");
  } else {
    setInputDefault(email);
  }

  // ==================== Password ====================
  if (password.value === passwordRepeated.value) {
    if (password.value.length < 7) {
      formIsOK = false;
      setInputAlert(password, "Password is too short!");
      setInputAlert(passwordRepeated, "Password is too short!");
    } else {
      setInputDefault(password);
      setInputDefault(passwordRepeated);
    }
  } else {
    formIsOK = false;
    setInputAlert(password, "Passwords don't match!");
    setInputAlert(passwordRepeated, "Passwords don't match!");
  }

  if (formIsOK) {
    console.log("TO-DO: Send register to the server!");
  }
}

/*======================================================= Indexed DB ==========================================*/

window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || 
window.msIndexedDB;
 
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || 
window.msIDBTransaction;
window.IDBKeyRange = window.IDBKeyRange || 
window.webkitIDBKeyRange || window.msIDBKeyRange
 
if (!window.indexedDB) {
   window.alert("Your browser doesn't support a stable version of IndexedDB.")
}

