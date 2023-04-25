class Library {
  constructor(document, localStorage) {
    this.document = document;
    this.localStorage = localStorage;
  }

  initialize(collectionOfBooks, bookList) {
    if (!this.getBooks()) {
      this.saveBook(collectionOfBooks);
    } else {
      collectionOfBooks = JSON.parse(this.getBooks());
      this.displayBooks(collectionOfBooks, bookList);
    }
    this.removeBook(collectionOfBooks);
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
          this.saveBook(collectionOfBooks);
          this.getElement(`#book-item-${id}`).remove();
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
  }

  displayBooks(books, bookList) {
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
      bookList.appendChild(bookItem);
    });
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
  const bookList = library.getElement('#book-list');
  const collectionOfBooks = [];

  // Initialize the library if we have any books stored
  library.initialize(collectionOfBooks, bookList);

  // Add a new book to the collection with title and author.
  library.getElement('#submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    collectionOfBooks.push(library.getInputValues());
    library.clearInputs();

    library.saveBook(collectionOfBooks);
    library.removeBookOnHtmlPage();
    library.displayBooks(collectionOfBooks, bookList);
  });
});