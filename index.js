document.addEventListener('DOMContentLoaded', () => {
  // A collection that keeps a list of books.
  const bookList = document.querySelector('#book-list');
  let collectionOfBooks = [];

  function bookOnHtmlPage(books) {
    books.forEach((book, id) => {
      const bookItem = document.createElement('li');
      bookItem.setAttribute('id', `book-item-${id}`);
      bookItem.setAttribute('class', 'book-item');
      bookItem.innerHTML = `<div>
    <h3>${book.title}</h3>
    <p>${book.author}</p>
    <button id=remove-btn-${id} class='remove-btn'>Remove</button>
    <hr style='width: 50%; margin-left: 0;'>
    </div>`;
      bookList.appendChild(bookItem);
    });
  }

  // Remove a book from the collection.
  function removeFunction() {
    if (collectionOfBooks.length > 0) {
      collectionOfBooks.forEach((book, id) => {
        document.querySelector(`#remove-btn-${id}`).addEventListener('click', (e) => {
          e.preventDefault();
          if (collectionOfBooks.length === 1) {
            collectionOfBooks.pop();
          } else {
            collectionOfBooks.splice(id, 1);
          }
          localStorage.setItem('collectionOfBooks', JSON.stringify(collectionOfBooks));
          document.querySelector(`#book-item-${id}`).remove();
        });
      });
    }
  }

  function bookOnHtmlPageRemove() {
    document.querySelectorAll('.book-item').forEach((book) => {
      book.remove();
    });
  }

  if (!localStorage.getItem('collectionOfBooks')) {
    localStorage.setItem('collectionOfBooks', JSON.stringify(collectionOfBooks));
  } else {
    collectionOfBooks = JSON.parse(localStorage.getItem('collectionOfBooks'));
    bookOnHtmlPage(collectionOfBooks);
  }
  removeFunction();

  // Add a new book to the collection with title and author.
  document.querySelector('#submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    const title = document.querySelector('#title').value;
    document.querySelector('#title').value = '';
    const author = document.querySelector('#author').value;
    document.querySelector('#author').value = '';
    collectionOfBooks.push({ title, author });
    localStorage.setItem('collectionOfBooks', JSON.stringify(collectionOfBooks));
    bookOnHtmlPageRemove();
    bookOnHtmlPage(collectionOfBooks);
    removeFunction();
  });
});