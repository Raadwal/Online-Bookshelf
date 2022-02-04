window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.");
}

let db;
let objectStore;
let request = window.indexedDB.open("Books-DB");

request.onerror = function (event) {
  console.log("Error while opening indexedDB!");
};

request.onsuccess = function (event) {
  db = request.result;
  showBooks();
};

request.onupgradeneeded = function (event) {
  db = event.target.result;
  objectStore = db.createObjectStore("books", { keyPath: ["title", "author"] });
};

// ========================================================================================================

const statusMap = new Map();
statusMap.set(-1, "Want to read");
statusMap.set(0, "Reading");
statusMap.set(1, "Finished");

/*======================================================= Indexed DB ==========================================*/
function addBookToIndexedDB(book) {
    return new Promise((res, rej) => {
        const objectStore =db.transaction(["books"], "readwrite").objectStore("books");
        const request = objectStore.add(book);

        request.onsuccess = () => {
            res(book);
        };

        request.onerror = e => {
            rej(e)
        };
    });
}

function getAllBooksFromIndexedDB() {
    return new Promise((res, rej) => {
        const objectStore = db.transaction("books").objectStore("books");

        objectStore.getAll().onsuccess = e => {
            res(e.target.result);
        };

        objectStore.getAll().onerror = e => {
            rej(e);
        };
    });
}

function updateBookInIndexedDB(key, separator, newStatus, newScore) {
  [keyTitle, keyAuthor] = key.split(separator);

  return new Promise((res, rej) => {
    const objectStore = db.transaction(["books"], "readwrite").objectStore("books");
    const request = objectStore.openCursor();

    request.onsuccess = (e) => {
      const cursor = e.target.result;
      if(cursor) {
        if(cursor.key[0] === keyTitle && cursor.key[1] === keyAuthor) {
          const updatedBook = cursor.value;

            updatedBook.status = newStatus;
            updatedBook.score = newScore;

            cursor.update(updatedBook);
          }

        cursor.continue();
        }
      }
    

    request.onerror = e => {
      rej(e);
    }
  })
}

function removeBookFromIndexedDB(key, separator) {
  [keyTitle, keyAuthor] = key.split(separator);

  return new Promise((res, rej) => {
    const objectStore = db.transaction(["books"], "readwrite").objectStore("books");
    const request = objectStore.delete([keyTitle, keyAuthor]);

    request.onsuccess = () => {
      res(true);
    }

    request.onerror = e => {
      rej(e);
    }
  })
}