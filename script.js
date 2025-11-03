let myLibrary = [];

function Book(title, author, pages, read) {
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    console.log(`${title} by ${author}, ${pages} pages, ${read ? "read" : "not read yet"}`);
  }
}

Book.prototype.toggleRead = function() {
  this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
  configureBook(document.querySelector(".book-container"), newBook);
}

function removeBook(bookId) {
  document.querySelector(`[data-book-id="${bookId}"]`).remove();
  myLibrary = myLibrary.filter(book => book.id !== bookId);
}

function configureBook(container, book) {
  const bookElement = document.createElement("div");
  bookElement.classList.add("book");
  bookElement.setAttribute("data-book-id", book.id);
  const removeBookButton = document.createElement("button");
  removeBookButton.classList.add("remove-book-button");
  removeBookButton.setAttribute("aria-label", "Remove book");
  removeBookButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
      <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
  `;
  removeBookButton.addEventListener("click", () => {
    removeBook(book.id);
  });
  bookElement.innerHTML = `
    <h2 class="book-title">${book.title}</h2>
    <p class="book-author">${book.author}</p>
    <p class="book-pages">${book.pages}</p>
    <p class="book-read">${book.read ? "Read" : "Not Read"}</p>
  `;
  const toggleReadButton = document.createElement("button");
  toggleReadButton.classList.add("toggle-read-button");
  toggleReadButton.setAttribute("aria-label", "Toggle read status");
  toggleReadButton.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
    </svg>
  `;
  toggleReadButton.addEventListener("click", () => {
    book.toggleRead();
    bookElement.querySelector(".book-read").textContent = book.read ? "Read" : "Not Read";
  });
  bookElement.appendChild(toggleReadButton);
  bookElement.appendChild(removeBookButton);
  container.appendChild(bookElement);
}

function displayBooks() {
  const bookContainer = document.querySelector(".book-container");
  // Clear the book container
  document.querySelector(".book-container").innerHTML = "";
  // Display the books
  myLibrary.forEach(book => {
    configureBook(bookContainer, book);
  });
}

function initLibrary() {
  const addBookButton = document.querySelector(".add-book-button");
  const closeBookButton = document.querySelector("dialog button");
  addBookButton.addEventListener("click", () => {
    document.querySelector(".add-book-dialog").showModal();
  });
  closeBookButton.addEventListener("click", () => {
    document.querySelector(".add-book-dialog").close();
  });

  const submitButton = document.querySelector("dialog form button[type='submit']");
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = parseInt(document.querySelector("#pages").value);
    const read = document.querySelector("#read").checked;
    if (!title || !author) {
      alert("Please fill in all fields");
      return;
    }
    addBookToLibrary(title, author, isNaN(pages) ? 0 : pages, read);
    displayBooks();
    closeBookButton.click();
    document.querySelector("dialog form").reset();
  });
  
  addBookToLibrary("The Great Gatsby", "F. Scott Fitzgerald", 180, true);
  addBookToLibrary("1984", "George Orwell", 328, false);
  addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 281, true);
  addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, false);
  addBookToLibrary("The Catcher in the Rye", "J.D. Salinger", 224, true);
  addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, false);
  addBookToLibrary("The Little Prince", "Antoine de Saint-Exupéry", 96, true);
  addBookToLibrary("The Alchemist", "Paulo Coelho", 160, false);
  addBookToLibrary("The Lord of the Rings", "J.R.R. Tolkien", 1137, true);
  addBookToLibrary("The Hitchhiker's Guide to the Galaxy", "Douglas Adams", 193, false);
  displayBooks();
}

initLibrary();