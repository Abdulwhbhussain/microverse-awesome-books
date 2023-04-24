// A collection that keeps a list of books.
const bookList = document.querySelector("#book-list");

let collectionOfBooks = [
    {title: 'The Hobbit', author: 'J.R.R. Tolkien'},
    {title: 'The Chronicles of Narnia', author: 'C.S. Lewis'},
];
console.log(collectionOfBooks);

function bookOnHtmlPage(books) {
    collectionOfBooks.forEach((book, id) => {
        const bookItem = document.createElement("li");
        bookItem.setAttribute("id", `book-item-${id}`);
        bookItem.setAttribute("class", `book-item`);
        bookItem.innerHTML = `<center>
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <button id=remove-btn-${id} class="remove-btn">Remove</button>
        <hr style="width: 50%;">
        </center>`;
        bookList.appendChild(bookItem);
    });
};

bookOnHtmlPage(collectionOfBooks);

// Add a new book to the collection with title and author.

document.querySelector("#submit-btn").addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title").value;
    console.log(title);
    const author = document.querySelector("#author").value;
    console.log(author);
    collectionOfBooks.push({title, author});
    console.log(collectionOfBooks);
    // bookOnHtmlPage(collectionOfBooks);
});

// Remove a book from the collection.

collectionOfBooks.forEach((book, id) => {
    document.querySelector(`#remove-btn-${id}`).addEventListener("click", (e) => {
        collectionOfBooks.splice(id, 1);
        console.log(collectionOfBooks);
        // document.querySelector(`#book-item-${id}`).remove();
    });
});