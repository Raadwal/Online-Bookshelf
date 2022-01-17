const booksDataOutput = document.getElementById("books-data");
const repeat = 10;

let bookData = ` 
    <div class="card-book">
    <div class="book-title">Title</div>
    <div class="book-author">Author</div>
    <div class="book-genre">Genre</div>
    <div class="book-pages">Pages</div>
    <div class="book-reading-period">
        <div class="started-reading">00.00.0000</div>
        <div class="ended-reading">00.00.0000</div>
    </div>
    <div class="book-reading-status">Status</div>
    <div class="book-score">Score</div>
    </div> 
`;

let bookDataLong = ` 
    <div class="card-book">
    <div class="book-title">TitleTitle TitleTitleTitle TitleTitleTiel Title</div>
    <div class="book-author">Authordsadsjkglaghask fdasfdasfdas fdsa fdasf das fdasfdsa</div>
    <div class="book-genre">dsadsaddasgdaf</div>
    <div class="book-pages">12341</div>
    <div class="book-reading-period">
        <div class="started-reading">00.00.0000</div>
        <div class="ended-reading">00.00.0000</div>
    </div>
    <div class="book-reading-status">Want to Read</div>
    <div class="book-score">10</div>
    </div> 
`;

for(let i = 0; i < repeat; i++) {
    booksDataOutput.innerHTML = booksDataOutput.innerHTML + bookData;
}
