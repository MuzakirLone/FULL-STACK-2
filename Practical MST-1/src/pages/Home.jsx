function Home({ navigate }) {
    return (
        <div>
            <h1>Welcome to the Book Store</h1>
            <p>Browse our collection of books and discover your next great read.</p>
            <br />
            <button onClick={() => navigate('books')}>View All Books</button>
        </div>
    )
}

export default Home
