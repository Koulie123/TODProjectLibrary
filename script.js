let myLibrary = [];
const libraryDisplayTable = document.getElementById("library-table-body");
const bookSubmitButton = document.getElementById("submit-book");
const bookTitleInput = document.getElementById("book-title")
const bookAuthorInput = document.getElementById("book-author");
const bookNumberOfPagesInput = document.getElementById("number-of-pages");
const bookHasBeenReadInput = document.getElementById("has-been-read");
const displayInputFormButton = document.getElementById("display-input-form-button");
const inputForm = document.getElementById("input-form");
let displayInputForm = false;

function OnInitialized() {
    myLibrary.push({title: "example", author: "the title", numberOfPages: 14, hasBeenRead: true})
    remakeBookTable();
}


function Book(title, author, numberOfPages, hasBeenRead) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.hasBeenRead = hasBeenRead;
}

function addBookToLibrary(Book) {
    if (Book.title == "" || Book.author == "" || Book.numberOfPages == 0) return;
    myLibrary.push(Book);
    console.log(`BookAdded = ${Book.title}`);
    remakeBookTable();
}
// function updateLibraryTable(Book){
//     if (Book.title == "" || Book.author == "") return;
//     const row = document.createElement("tr");
//     const title = document.createElement("td");
//     const author = document.createElement("td");
//     title.textContent = Book.title;
//     author.textContent = Book.author;
//     row.appendChild(title);
//     row.appendChild(author);
//     libraryDisplayTable.appendChild(row);
//     clearInputs();
// }
function clearInputs() {
    bookTitleInput.value = "";
    bookAuthorInput.value = "";
}

function remakeBookTable(){
    while (libraryDisplayTable.firstChild){
        libraryDisplayTable.removeChild(libraryDisplayTable.lastChild);
    }
    let rowCount = 1;
    myLibrary.forEach(element => {
        element.rowCount = rowCount;
        const row = document.createElement("tr");
        const title = document.createElement("td");
        const author = document.createElement("td");
        const pages = document.createElement("td");
        const beenRead = document.createElement("td");
        const removeTD = createRemoveButton(rowCount);
        const rowNumber = document.createElement("td");
        const toggleReadButton = createReadToggleButton(rowCount);
        title.textContent = element.title;
        author.textContent = element.author;
        pages.textContent = element.numberOfPages;
        beenRead.textContent = element.hasBeenRead;
        beenRead.appendChild(toggleReadButton);
        rowNumber.textContent = rowCount;
        rowNumber.id = rowCount + "rowId"
        rowCount += 1;
        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(beenRead);
        row.appendChild(removeTD);
        row.appendChild(rowNumber);
        libraryDisplayTable.appendChild(row);
    });
    clearInputs();
    console.log(myLibrary);
}
function createReadToggleButton(rowCount) {
    const button = document.createElement("button");
    button.textContent = "toggle read Status";
    button.addEventListener("click", () => handleHasReadToggle(rowCount));
    return button;
}
function handleHasReadToggle(rowCount){
    myLibrary[rowCount - 1].hasBeenRead = !(myLibrary[rowCount - 1].hasBeenRead);
    remakeBookTable();
}
function createRemoveButton(rowCount) {
    const td = document.createElement("td");
    const button = document.createElement("button");
    button.textContent = "Remove";
    button.addEventListener("click", () => {
        myLibrary = myLibrary.filter((book) => book.rowCount !=  rowCount);
        remakeBookTable();
        console.log("Removed book");
    })
    td.appendChild(button);
    return td;
}
function toggleFormDisplay() {
    displayInputForm = !displayInputForm;
    if (displayInputForm === true) {
        inputForm.style.display = "flex ";
    } else {
        inputForm.style.display = "none";
    }
}
bookSubmitButton.addEventListener("click", () => {
    let bookTitle = bookTitleInput.value;
    let bookAuthor = bookAuthorInput.value;
    let bookPages = bookNumberOfPagesInput.value;
    let bookHasBeenRead = bookHasBeenReadInput.checked;
    let book = new Book(bookTitle, bookAuthor, bookPages, bookHasBeenRead);
    addBookToLibrary(book);
})

OnInitialized();