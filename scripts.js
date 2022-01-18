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
const buttonCloseLoginUser = document.getElementById("backdrop-login-user-close");
const buttonCloseRegisterUser = document.getElementById("backdrop-register-user-close");
const buttonCloseInfo = document.getElementById("backdrop-info-close");

const buttonSubmitFormAddBook = document.getElementById("submit-form-add-book");
const buttonSubmitFormLoginUser = document.getElementById("submit-form-login-user");
const buttonSubmitFormRegisterUser = document.getElementById("submit-form-register-user");

function init() {
  // Navigation buttons
  buttonShowBooks.addEventListener("click", showBooks);

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
    readAllBooks(document.getElementById("books-data"));
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
    validateAndSendAddBookFormData()
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
}

function showInfoBackdrop(openedBackdrop, header, message) {
  if(openedBackdrop) {
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

function clearAddBookForm() {
  document.getElementById("add-book-title").value = "";
  document.getElementById("add-book-author").value = "";
  document.getElementById("add-book-genre").value = "";
  document.getElementById("add-book-pages").value = "";
  document.getElementById("add-book-score").value = "";
}

function clearLoginForm() {
  document.getElementById("login-user-email").value = "";
  document.getElementById("login-user-password").value = "";
}

function clearRegisterForm() {
  document.getElementById("register-user-name").value = "";
  document.getElementById("register-user-email").value = "";
  document.getElementById("register-user-password").value = "";
  document.getElementById("register-user-password-repeated").value = "";
}

async function validateAndSendAddBookFormData() {
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
        if (Number.isInteger(Number(score.value)) && Number(score.value) >= 0 && Number(score.value) <= 10) {
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
    score.value = 0;
  }

  if (formIsOK) {
    const book = {
      title: title.value,
      author: author.value,
      genre: genre.value,
      pages: pages.value,
      status: status.value,
      score: score.value,
    };

    addBook(book);
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
    clearLoginForm();
  }
}

function validateAndSendRegisterUserFormData() {
  let formIsOK = true;

  const name = document.getElementById("register-user-name"); // done
  const email = document.getElementById("register-user-email"); // done
  const password = document.getElementById("register-user-password"); // done
  const passwordRepeated = document.getElementById("register-user-password-repeated"); // done

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
    clearRegisterForm();
  }
}

async function showBooks() {
  const booksData = await getAllBooksFromIndexedDB();
  const outputHTML = [];

  booksData.forEach(book => {
    let bookToHTML = `
    <div class="card-book">
    <div class="book-title">${book.title}</div>
    <div class="book-author">${book.author}</div>
    <div class="book-genre">${book.genre}</div>
    <div class="book-pages">${book.pages}</div>
    <div class="book-reading-status">${statusMap.get(Number(book.status))}</div>
    <div class="book-score">${book.score}</div>
    </div> 
    `;

    outputHTML.push(bookToHTML);
  });

  const resultDiv = document.getElementById("books-data");
  resultDiv.innerHTML = cardBookTitle;
  
  outputHTML.forEach(bookHTML => {
    resultDiv.innerHTML += bookHTML;
  }); 
};

async function addBook(book) {
  try {
    await addBookToIndexedDB(book);
    await showBooks();
    clearAddBookForm();
    showInfoBackdrop(document.getElementById("backdrop-add-book"), "Success!", "Book has been added!");
  } catch (error) {
    setInputAlert(title, "Book & Author combination exists!");
    setInputAlert(author, "Book & Author combination exists!");
  }
}

async function showEditMenu() {
  const booksData = await getAllBooksFromIndexedDB();
  const outputHTML = [];

  booksData.forEach(book => {
    let key = book.title + separator + book.author;
    let bookToHTML = `
      <option value=${key}>
      Title: ${book.title},\t
      Author: ${book.author},\t 
      Genre: ${book.genre},\t
      Pages: ${book.pages},\t
      Status: ${statusMap.get(Number(book.status))},\t 
      Score: ${book.score} 
      </option> 
    `;

    outputHTML.push(bookToHTML);
  });

  const resultDiv = document.getElementById("books-data");
  let htmlString = "<select size=10 id=\"select-edit-book\">";

  outputHTML.forEach(bookHTML => {
    htmlString += bookHTML;
  })

  htmlString += "</select>";
  htmlString += "<div class=\"wrapper-update-input\">";
  htmlString += "<label for=\"update-book-status\"> Status: </label>";
  htmlString += "<select id=\"update-book-status\" name=\"update-book-status\">";
  htmlString += "<option value=\"-1\">Want to read</option>";
  htmlString += "<option value=\"0\">Reading</option>";
  htmlString += "<option value=\"1\">Finished</option>";
  htmlString += "</select>";
  htmlString += "<label for=\"update-book-score\"> Score: </label>";
  htmlString += "<input type=\"text\" id=\"update-book-score\" name=\"update-book-score\"/>";
  htmlString += "</div>";
  htmlString += "<button id=\"button-edit-selected-book\">Edit Selected Book</button>";

  resultDiv.innerHTML = htmlString;

  document.getElementById("button-edit-selected-book").addEventListener("click", (event) => {
    event.preventDefault();
    const selectedBook = document.getElementById("select-edit-book");
    if(!(selectedBook.value === "")) {
      let newStatus = document.getElementById("update-book-status");
      let newScore = document.getElementById("update-book-score");

      let formOK = true;
      
      if(newStatus.value == 1) {
        if(newScore.value >= 0 && newScore.value <= 10) {
          setInputDefault(newStatus);
        } else {
          setInputAlert(newScore, "Score between 0 and 10!")
          formOK = false;
        }
      } else if(newScore.value == -1 || newScore.value == -0) {
        setInputDefault(newStatus);
        newScore.value = 0
      } else {
        setInputDefault(newStatus);
        newStatus.value = -1;
        newScore.value = 0;
      }

      if(formOK) {
        const success = updateBookInIndexedDB(selectedBook.value, separator, newStatus.value, newScore.value);

      if(success) {
        showInfoBackdrop(null, "Success!", "Book has been successfully edited!");
        showEditMenu();
      }
      }
    }
  });
}

async function showRemoveMenu() {
  const booksData = await getAllBooksFromIndexedDB();
  const outputHTML = [];

  booksData.forEach(book => {
    let key = book.title + separator + book.author;
    let bookToHTML = `
      <option value=${key}>
      Title: ${book.title},\t
      Author: ${book.author},\t 
      Genre: ${book.genre},\t
      Pages: ${book.pages},\t
      Status: ${statusMap.get(Number(book.status))},\t 
      Score: ${book.score} 
      </option> 
    `;

    outputHTML.push(bookToHTML);
  });

  const resultDiv = document.getElementById("books-data");
  let htmlString = "<select size=10 id=\"select-remove-book\">";

  outputHTML.forEach(bookHTML => {
    htmlString += bookHTML;
  })

  htmlString += "</select>";
  htmlString += "<button id=\"button-remove-selected-book\">Remove Selected Book</button>";

  resultDiv.innerHTML = htmlString;

  document.getElementById("button-remove-selected-book").addEventListener("click", () => {
    const selectedBook = document.getElementById("select-remove-book");
    if(!(selectedBook.value === "")) {
      const success = removeBookFromIndexedDB(selectedBook.value, separator);

      if(success) {
        showRemoveMenu();
        showInfoBackdrop(null, "Success!", "Book has been successfully removed!");
      }
    }
  });
}