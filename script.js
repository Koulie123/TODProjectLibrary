const myLibrary = [];
const libraryDisplayTable = document.getElementById("library-table-body");
const bookSubmitButton = document.getElementById("submit-book");
const bookTitleInput = document.getElementById("book-title")
const bookAuthorInput = document.getElementById("book-author");

bookSubmitButton.addEventListener("click", () => {
    let bookTitle = bookTitleInput.value;
    let bookAuthor = bookAuthorInput.value;
    let book = new Book(bookTitle, bookAuthor);
    addBookToLibrary(book);
})


function Book(title, author) {
    this.title = title;
    this.author = author;
}

function addBookToLibrary(Book) {
    myLibrary.push(Book);
    console.log(`BookAdded = ${Book.title}`);
    updateLibraryTable(Book);
}
function updateLibraryTable(Book){
    const row = document.createElement("tr");
    const title = document.createElement("td");
    const author = document.createElement("td");
    title.textContent = Book.title;
    author.textContent = Book.author;
    row.appendChild(title);
    row.appendChild(author);
    libraryDisplayTable.appendChild(row);
}