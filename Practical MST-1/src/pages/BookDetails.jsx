function BookDetails({ book, navigate }) {
    return (
        <div>
            <h1>Book Details</h1>
            <h2>{book.title}</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Author</td>
                        <td>{book.author}</td>
                    </tr>
                    <tr>
                        <td>Genre</td>
                        <td>{book.genre}</td>
                    </tr>
                    <tr>
                        <td>Year</td>
                        <td>{book.year}</td>
                    </tr>
                    <tr>
                        <td>Pages</td>
                        <td>{book.pages}</td>
                    </tr>
                    <tr>
                        <td>Description</td>
                        <td>{book.description}</td>
                    </tr>
                </tbody>
            </table>
            <br />
            <button className="back-btn" onClick={() => navigate('books')}>
                ← Back to Books List
            </button>
        </div>
    )
}

export default BookDetails
