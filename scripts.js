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
  "submir-form-register-user"
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
    console.log("New user added!");
  });

  buttonRegisterUser.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("New user registered!");
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
}

function validateAndSendAddBookFormData() {
  let everythingIsCorrect = true;

  const title = document.getElementById("add-book-title"); // done
  const author = document.getElementById("add-book-author"); // done
  const genre = document.getElementById("add-book-genre");
  const pages = document.getElementById("add-book-pages"); // done
  const startedReading = document.getElementById("add-book-started-reading");
  const finishedReading = document.getElementById("add-book-finished-reading");
  const status = document.getElementById("add-book-status");
  const score = document.getElementById("add-book-score"); // done

  console.log(title.value);
  console.log(author.value);
  console.log(genre.value);
  console.log(pages.value);
  console.log(startedReading.value);
  console.log(finishedReading.value);
  console.log(status.value);
  console.log(score.value);

  // ==================== Title ====================
  if (title.value === "") {
    everythingIsCorrect = false;
    setInputAlert(title, "This field cannot be enpty!");
  } else {
    setInputDefault(title);
  }

  // ==================== Author ====================
  if (author.value === "") {
    everythingIsCorrect = false;
    setInputAlert(author, "This field cannot be enpty!");
  } else {
    setInputDefault(author);
  }

  // ==================== Pages ====================
  if (!(pages.value === "")) {
    if (!isNaN(pages.value)) {
      if (Number.isInteger(Number(pages.value)) && Number(pages.value) > 0) {
        setInputDefault(pages);
      } else {
        everythingIsCorrect = false;
        setInputAlert(pages, "It has to be a positive integer!");
      }
    } else {
      everythingIsCorrect = false;
      setInputAlert(pages, "It has to be a positive integer!");
    }
  } else {
    everythingIsCorrect = false;
    setInputAlert(pages, "It has to be a positive integer!");
  }

  // ==================== Score ====================
  if (!(score.value === "")) {
    if (!isNaN(score.value)) {
      if (Number.isInteger(Number(score.value)) && Number(score.value) >= 0 && Number(score.value) <= 10) {
          setInputDefault(score);
      } else {
        everythingIsCorrect = false;
        setInputAlert(score, "Score range: 0-10!");
      }
    } else {
      everythingIsCorrect = false;
      setInputAlert(score, "Score range: 0-10!");
    }
  } else {
    everythingIsCorrect = false;
    setInputAlert(score, "Score range: 0-10!");
  }

  if (everythingIsCorrect) {
    
  }
}

function validateAndSendLoginUserFormData() {}

function validateAndSendRegisterUserFormData() {}
