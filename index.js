class Library {
  constructor(document, localStorage) {
    this.document = document;
    this.localStorage = localStorage;
    this.bookList = this.getElement('#book-list');
    this.collectionOfBooks = [];
  }

  initialize() {
    if (!this.getBooks()) {
      this.saveBook(this.collectionOfBooks);
    } else {
      this.collectionOfBooks = JSON.parse(this.getBooks());
      this.displayBooks(this.collectionOfBooks, this.bookList);
    }
    this.removeBook(this.collectionOfBooks);
    this.collectionOfBooks = [];
  }

  getBooks() {
    return this.localStorage.getItem('collectionOfBooks');
  }

  removeBook(collectionOfBooks) {
    if (collectionOfBooks.length > 0) {
      collectionOfBooks.forEach((book, id) => {
        this.getElement(`#remove-btn-${id}`).addEventListener('click', (e) => {
          e.preventDefault();
          collectionOfBooks = collectionOfBooks.filter((bk) => bk !== book);
          this.getElement(`#book-item-${id}`).remove();
          this.saveBook(collectionOfBooks);
          console.log(collectionOfBooks);
          collectionOfBooks = [];
        });
      });
    }
  }

  removeBookOnHtmlPage() {
    this.getAllElements('.book-item').forEach((book) => {
      book.remove();
    });
  }

  saveBook(collectionOfBooks) {
    this.localStorage.setItem('collectionOfBooks', JSON.stringify(collectionOfBooks));
    collectionOfBooks = [];
  }

  newBook() {
    this.collectionOfBooks.push(this.getInputValues());
    this.clearInputs();

    this.saveBook(this.collectionOfBooks);
    this.removeBookOnHtmlPage();
    this.displayBooks(this.collectionOfBooks, this.bookList);
  }

  displayBooks(books) {
    books.forEach((book, id) => {
      const bookItem = this.document.createElement('li');
      bookItem.setAttribute('id', `book-item-${id}`);
      bookItem.setAttribute('class', 'book-item');
      bookItem.innerHTML = `<div class='book-item-div'>
      <div><span><b>"${book.title}"</b></span> <span> by </span>
      <span>${book.author}</span></div>
    
      <button id=remove-btn-${id} class='remove-btn'>Remove</button>
      </div>
      `;
      this.bookList.appendChild(bookItem);
    });
    this.removeBook(books);
  }

  clearInputs() {
    this.getElement('#title').value = '';
    this.getElement('#author').value = '';
  }

  getInputValues() {
    return {
      title: this.getElement('#title').value,
      author: this.getElement('#author').value,
    };
  }

  getElement(selector) {
    return this.document.querySelector(selector);
  }

  getAllElements(selector) {
    return this.document.querySelectorAll(selector);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // A collection that keeps a list of books.
  const library = new Library(document, localStorage);

  // Initialize the library if we have any books stored
  library.initialize();

  // Add a new book to the collection with title and author.
  library.getElement('#submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    library.newBook();
  });
});