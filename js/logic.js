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
    let data = {};
    data.email = email.value;
    data.password = password.value;

    requestDB = getRequestObject();
    requestDB.onreadystatechange = function () {
      if (requestDB.readyState == 4 && requestDB.status == 200) {
        const response = JSON.parse(requestDB.response);
        if (response.status === "Success") {
          showInfoBackdrop(document.getElementById("backdrop-login-user"), "Success!", "You are logged in!");
          clearLoginForm();
          document.getElementById("header-user").innerHTML = `
          User: ${response.user}
          <button onClick="logout()">Logout</button>
          `;
          isOnline = true;
          document.getElementById("status").innerText = "Status: online";
          buttonShowCharts.disabled = false;
          synchronize();
        } else {
          showInfoBackdrop(null, "Fail!", "Check your email and password!");
        }
      }
    };

    requestDB.open("post", "http://localhost/Online-Bookshelf/api/user/login", true);
    requestDB.send(JSON.stringify(data));
  }
}

function logout() {
  requestDB = getRequestObject();
  requestDB.onreadystatechange = function () {
    if (requestDB.readyState == 4 && requestDB.status == 200) {
      const response = JSON.parse(requestDB.response);
      if (response.status === "Success") {
        showInfoBackdrop(document.getElementById("backdrop-login-user"), "Success!", "You are logged out!");
        clearLoginForm();
        document.getElementById("header-user").innerHTML = `
          <button id="button-login-user">Login</button>
          <button id="button-register-user">Register</button>
          `;

        document.getElementById("button-login-user").addEventListener("click", () => {
          document.getElementById("backdrop-login-user").style.display = "block";
        });

        document.getElementById("button-register-user").addEventListener("click", () => {
          document.getElementById("backdrop-register-user").style.display = "block";
        });

        isOnline = false;
        document.getElementById("status").innerText = "Status: offline";
        buttonShowCharts.disabled = true;
        showBooks();
      } else {
        showInfoBackdrop(null, "Fail!", "Failed to logout!");
      }
    }
  };

  requestDB.open("post", "http://localhost/Online-Bookshelf/api/user/logout", true);
  requestDB.send(null);
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
    let data = {};
    data.name = name.value;
    data.email = email.value;
    data.password = password.value;
    data.passwordRepeated = passwordRepeated.value;

    requestDB = getRequestObject();
    requestDB.onreadystatechange = function () {
      if (requestDB.readyState == 4 && requestDB.status == 200) {
        const response = JSON.parse(requestDB.response);

        if (response.status === "Success") {
          showInfoBackdrop(document.getElementById("backdrop-register-user"), "Success!", "User has been succesfully registered!");
          clearRegisterForm();
        } else {
          showInfoBackdrop(null, "Fail!", "User registartion failed, try with different e-mail!");
        }
      }
    };

    requestDB.open("post", "http://localhost/Online-Bookshelf/api/user/register", true);
    requestDB.send(JSON.stringify(data));
  }
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

async function showBooks() {
  let booksData = [];

  if (isOnline) {
    booksData = await getAllBooksFromServerDB();
  } else {
    booksData = await getAllBooksFromIndexedDB();
  }
  const outputHTML = [];

  booksData.forEach((book) => {
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

  outputHTML.forEach((bookHTML) => {
    resultDiv.innerHTML += bookHTML;
  });
}

async function addBook(book) {
  if (isOnline) {
    const status = await insertBookServer(book);
    if (status == "Success") {
      await showBooks();
      clearAddBookForm();
      showInfoBackdrop(document.getElementById("backdrop-add-book"), "Success!", "Book has been added!");
    } else {
      showInfoBackdrop(document.getElementById("backdrop-add-book"), "Fail!", "Book hasn't been added!");
    }
  } else {
    try {
      await addBookToIndexedDB(book);
      clearAddBookForm();
      await showBooks();
    } catch (error) {
      setInputAlert(title, "Book & Author combination exists!");
      setInputAlert(author, "Book & Author combination exists!");
    }
  }
}

async function showEditMenu() {
  let booksData = [];

  if (isOnline) {
    booksData = await getAllBooksFromServerDB();
  } else {
    booksData = await getAllBooksFromIndexedDB();
  }

  const outputHTML = [];

  booksData.forEach((book) => {
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
  let htmlString = '<select size=10 id="select-edit-book">';

  outputHTML.forEach((bookHTML) => {
    htmlString += bookHTML;
  });

  htmlString += "</select>";
  htmlString += '<div class="wrapper-update-input">';
  htmlString += '<label for="update-book-status"> Status: </label>';
  htmlString += '<select id="update-book-status" name="update-book-status">';
  htmlString += '<option value="-1">Want to read</option>';
  htmlString += '<option value="0">Reading</option>';
  htmlString += '<option value="1">Finished</option>';
  htmlString += "</select>";
  htmlString += '<label for="update-book-score"> Score: </label>';
  htmlString += '<input type="text" id="update-book-score" name="update-book-score"/>';
  htmlString += "</div>";
  htmlString += '<button id="button-edit-selected-book">Edit Selected Book</button>';

  resultDiv.innerHTML = htmlString;

  document.getElementById("button-edit-selected-book").addEventListener("click", (event) => {
    event.preventDefault();
    const selectedBook = document.getElementById("select-edit-book");
    if (!(selectedBook.value === "")) {
      let newStatus = document.getElementById("update-book-status");
      let newScore = document.getElementById("update-book-score");

      let formOK = true;

      if (newStatus.value == 1) {
        if (newScore.value >= 0 && newScore.value <= 10) {
          setInputDefault(newStatus);
        } else {
          setInputAlert(newScore, "Score between 0 and 10!");
          formOK = false;
        }
      } else if (newScore.value == -1 || newScore.value == -0) {
        setInputDefault(newStatus);
        newScore.value = 0;
      } else {
        setInputDefault(newStatus);
        newStatus.value = -1;
        newScore.value = 0;
      }

      if (formOK) {
        let success = false;
        if (isOnline) {
          const status = updateBookInServerDB(selectedBook.value, separator, newStatus.value, newScore.value);
          if (status == "Success") success = true;
        } else {
          success = updateBookInIndexedDB(selectedBook.value, separator, newStatus.value, newScore.value);
        }

        if (success) {
          showInfoBackdrop(null, "Success!", "Book has been successfully edited!");
          showEditMenu();
        }
      }
    }
  });
}

async function showRemoveMenu() {
  let booksData = [];
  if (isOnline) {
    booksData = await getAllBooksFromServerDB();
  } else {
    booksData = await getAllBooksFromIndexedDB();
  }

  const outputHTML = [];

  booksData.forEach((book) => {
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
  let htmlString = '<select size=10 id="select-remove-book">';

  outputHTML.forEach((bookHTML) => {
    htmlString += bookHTML;
  });

  htmlString += "</select>";
  htmlString += '<button id="button-remove-selected-book">Remove Selected Book</button>';

  resultDiv.innerHTML = htmlString;

  document.getElementById("button-remove-selected-book").addEventListener("click", () => {
    const selectedBook = document.getElementById("select-remove-book");
    if (!(selectedBook.value === "")) {
      let success = false;
      if (isOnline) {
        const status = removeBookFromServerDB(selectedBook.value, separator);
        if (status == "Success") success = true;
      } else {
        success = removeBookFromIndexedDB(selectedBook.value, separator);
      }

      if (success) {
        showRemoveMenu();
        showInfoBackdrop(null, "Success!", "Book has been successfully removed!");
      }
    }
  });
}

async function synchronize() {
  const booksData = await getAllBooksFromIndexedDB();

  if (booksData.length > 0) {
    booksData.forEach((book) => {
      insertBookServer(book);
      removeBookFromIndexedDB(book.title + separator + book.author, separator);
    });
  }

  await showBooks();
  showInfoBackdrop(null, "Synchronization", "Data has been synchronized with server!");
}

async function showCharts() {
  const resultDiv = document.getElementById("books-data");
  resultDiv.innerHTML = `<canvas id="booksScore"> </canvas>`;
  resultDiv.innerHTML += `<canvas id="booksStatus"> </canvas>`;

  await booksStatusChart();
  await booksScoreChart();
}

async function booksScoreChart() {
  const booksData = await getAllBooksFromServerDB();
  const xValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  const yValues = new Array(11).fill(0);

  booksData.forEach((book) => {
    if (book.status == 1) {
      yValues[book.score]++;
    }
  });

  new Chart("booksScore", {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: "black",
          data: yValues,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Score",
        },
        legend: {
          display: false,
        },
      },
    },
  });
}

async function booksStatusChart() {
  const booksData = await getAllBooksFromServerDB();
  const yValues = new Array(3).fill(0);

  booksData.forEach((book) => {
    yValues[parseInt(book.status) + 1]++;
  });

  console.log(yValues);

  const xValues = ["Want to read", "Reading", "Finished"];
  const barColors = ["red", "orange", "green"];


  new Chart("booksStatus", {
    type: "doughnut",
    data: {
      labels: xValues,
      datasets: [
        {
          backgroundColor: barColors,
          data: yValues,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Books staus",
      },
      legend: {
        display: false,
      },
    },
  });
}
