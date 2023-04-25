document.addEventListener('DOMContentLoaded', () => {
  // A collection that keeps a list of books.
  const bookList = document.querySelector('#book-list');
  let collectionOfBooks = [];

  function bookOnHtmlPage(books) {
    books.forEach((book, id) => {
      const bookItem = document.createElement('li');
      bookItem.setAttribute('id', `book-item-${id}`);
      bookItem.setAttribute('class', 'book-item');
      if (id % 2 === 0) {
        bookItem.setAttribute('style', 'background-color: #db9833; padding: 10px;');
      } else {
        bookItem.setAttribute('style', 'background-color: #7e9a9a; padding: 10px;');
      }
      bookItem.innerHTML = `<div class='book-item-div'>
      <div><span><b>"${book.title}"</b></span> <span> by </span>
      <span>${book.author}</span></div>
    
    <button id=remove-btn-${id} class='remove-btn'>Remove</button>
    </div>
    `;
      bookList.appendChild(bookItem);
    });
  }

  // Remove a book from the collection.
  function removeFunction() {
    if (collectionOfBooks.length > 0) {
      collectionOfBooks.forEach((book, id) => {
        document.querySelector(`#remove-btn-${id}`).addEventListener('click', (e) => {
          e.preventDefault();
        //   if (collectionOfBooks.length === 1) {
        //     collectionOfBooks.pop();
        //   } else {
        //     collectionOfBooks.splice(id, 1);
        //   }
          collectionOfBooks = collectionOfBooks.filter((bk) => bk !== book);
          localStorage.setItem('collectionOfBooks', JSON.stringify(collectionOfBooks));
          document.querySelector(`#book-item-${id}`).remove();
        //   bookOnHtmlPageRemove();
        //   bookOnHtmlPage(collectionOfBooks);
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