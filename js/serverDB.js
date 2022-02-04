async function insertBookServer(book) {
  let status;

  requestDB = getRequestObject();
  requestDB.onreadystatechange = function () {
    if (requestDB.readyState == 4 && requestDB.status == 200) {
      const response = JSON.parse(requestDB.response);
      status = response.status;
    }
  };
  requestDB.open("post", "http://localhost/Online-Bookshelf/api/book/insert", false);
  requestDB.send(JSON.stringify(book));

  return status;
}

async function getAllBooksFromServerDB() {
  let response;
  requestDB = getRequestObject();
  requestDB.onreadystatechange = function () {
    if (requestDB.readyState == 4 && requestDB.status == 200) {
      response = JSON.parse(requestDB.response);
    }
  };
  requestDB.open("get", "http://localhost/Online-Bookshelf/api/book/list", false);
  requestDB.send(null);

  return response;
}

async function deleteBookFromServerDB() {

}

function removeBookFromServerDB(key, separator) 
{
  let status = null;
  [keyTitle, keyAuthor] = key.split(separator);

  let response;
  requestDB = getRequestObject();
  requestDB.onreadystatechange = function () {
    if (requestDB.readyState == 4 && requestDB.status == 200) {
      response = JSON.parse(requestDB.response);
      status = response.status;
    }
  };

  requestDB.open("delete", "http://localhost/Online-Bookshelf/api/book/delete/" + keyTitle + "/" + keyAuthor, false);
  requestDB.send(null);

  return status;
}

function updateBookInServerDB(key, separator, newStatus, newScore)
{
  let status = null;
  [keyTitle, keyAuthor] = key.split(separator);

  const data = {};
  data.status = newStatus;
  data.score = newScore;

  let response;
  requestDB = getRequestObject();
  requestDB.onreadystatechange = function () {
    if (requestDB.readyState == 4 && requestDB.status == 200) {
      response = JSON.parse(requestDB.response);
      status = response.status;
      
    }
  };

  requestDB.open("put", "http://localhost/Online-Bookshelf/api/book/update/" + keyTitle + "/" + keyAuthor, false);
  requestDB.send(JSON.stringify(data));

  return status;
}