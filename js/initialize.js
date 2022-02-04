let isOnline = false;

let requestDB;
let objJSON;
function getRequestObject() {
  if (window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } else if (window.XMLHttpRequest) {
    return new XMLHttpRequest();
  } else {
    return null;
  }
}

document.addEventListener("DOMContentLoaded", init);

const cardBookTitle = document.getElementById("books-data").innerHTML;
const separator = ":-::-:";
// Black from css to restore default after alert
const blackColor = "#1d1d1b";
const whiteColor = "#ffffff";

const buttonShowBooks = document.getElementById("button-show-books");
const buttonAddBook = document.getElementById("button-add-book");
const buttonUpdateBook = document.getElementById("button-update-book");
const buttonRemoveBook = document.getElementById("button-remove-book");
const buttonShowCharts = document.getElementById("button-show-charts");
const buttonLoginUser = document.getElementById("button-login-user");
const buttonRegisterUser = document.getElementById("button-register-user");

const buttonCloseAddBook = document.getElementById("backdrop-add-book-close");
const buttonCloseUpdateBook = document.getElementById("backdrop-update-book-close");
const buttonCloseLoginUser = document.getElementById("backdrop-login-user-close");
const buttonCloseRegisterUser = document.getElementById("backdrop-register-user-close");
const buttonCloseInfo = document.getElementById("backdrop-info-close");

const buttonSubmitFormAddBook = document.getElementById("submit-form-add-book");
const buttonSubmitFormUpdateBook = document.getElementById("submit-form-update-book");
const buttonSubmitFormLoginUser = document.getElementById("submit-form-login-user");
const buttonSubmitFormRegisterUser = document.getElementById("submit-form-register-user");

function init() {
  // Navigation buttons
  buttonShowBooks.addEventListener("click", showBooks);
  buttonShowCharts.disabled = true;

  buttonAddBook.addEventListener("click", () => {
    document.getElementById("backdrop-add-book").style.display = "block";
  });

  buttonUpdateBook.addEventListener("click", () => {
    showEditMenu();
  });

  buttonRemoveBook.addEventListener("click", () => {
    showRemoveMenu();
  });

  buttonShowCharts.addEventListener("click", () => {
    showCharts();
  });

  if (buttonRegisterUser != null) {
    buttonLoginUser.addEventListener("click", () => {
      document.getElementById("backdrop-login-user").style.display = "block";
    });
  }

  if (buttonLoginUser != null) {
    buttonRegisterUser.addEventListener("click", () => {
      document.getElementById("backdrop-register-user").style.display = "block";
    });
  }

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
    validateAndSendAddBookFormData();
  });

  buttonSubmitFormLoginUser.addEventListener("click", (event) => {
    event.preventDefault();
    validateAndSendLoginUserFormData();
  });

  buttonSubmitFormRegisterUser.addEventListener("click", (event) => {
    event.preventDefault();
    validateAndSendRegisterUserFormData();
  });

  buttonCloseInfo.addEventListener("click", (event) => {
    document.getElementById("backdrop-info").style.display = "none";
  });

  requestDB = getRequestObject();
  requestDB.onreadystatechange = function () {
    if (requestDB.readyState == 4 && requestDB.status == 200) {
      const response = JSON.parse(requestDB.response);
      if (response.status === "Success") {
        document.getElementById("header-user").innerHTML = `
        User: ${response.user}
        <button onClick="logout()">Logout</button>
        `;
        isOnline = true;
        document.getElementById("status").innerText = "Status: online";
        buttonShowCharts.disabled = false;
        showBooks();
      }
    }
  };

  requestDB.open("get", "http://localhost/Online-Bookshelf/api/user/status", true);
  requestDB.send(null);
}

function showInfoBackdrop(openedBackdrop, header, message) {
  if (openedBackdrop) {
    openedBackdrop.style.display = "none";
  }

  document.getElementById("backdrop-info").style.display = "block";

  document.getElementById("header-text").innerText = header;
  document.getElementById("message-text").innerText = message;
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
