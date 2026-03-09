function BooksList({ books, navigate }) {
    return (
        <div>
            <h1>Books List</h1>
            <p>Click on a book title to view its details.</p>
            <br />
            <ul>
                {books.map((book) => (
                    <li key={book.id}>
                        <button onClick={() => navigate('details', book)}>
                            {book.title}
                        </button>
                        {' '}— {book.author} ({book.year})
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BooksList
