import { useState } from 'react'
import Home from './pages/Home'
import BooksList from './pages/BooksList'
import BookDetails from './pages/BookDetails'

const books = [
    {
        id: 1,
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        genre: 'Fiction',
        year: 1925,
        pages: 180,
        description:
            'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, set in the summer of 1922.',
    },
    {
        id: 2,
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        genre: 'Fiction',
        year: 1960,
        pages: 281,
        description:
            'The story of young Scout Finch growing up in Alabama during the Great Depression, witnessing racial injustice and moral growth.',
    },
    {
        id: 3,
        title: '1984',
        author: 'George Orwell',
        genre: 'Dystopian',
        year: 1949,
        pages: 328,
        description:
            'A chilling depiction of a totalitarian society where Big Brother watches every move and independent thought is a crime.',
    },
    {
        id: 4,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        genre: 'Adventure',
        year: 1988,
        pages: 197,
        description:
            'A philosophical novel following a young Andalusian shepherd named Santiago on his journey to find treasure.',
    },
    {
        id: 5,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        genre: 'Romance',
        year: 1813,
        pages: 432,
        description:
            'The story of Elizabeth Bennet and Mr. Darcy as they navigate issues of manners, upbringing, morality, and marriage.',
    },
    {
        id: 6,
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        genre: 'Fantasy',
        year: 1937,
        pages: 310,
        description:
            'Bilbo Baggins is swept into an epic quest to reclaim the Lonely Mountain from the dragon Smaug, guided by the wizard Gandalf.',
    },
]

function App() {
    const [currentPage, setCurrentPage] = useState('home')
    const [selectedBook, setSelectedBook] = useState(null)

    const navigate = (page, book = null) => {
        setCurrentPage(page)
        if (book) setSelectedBook(book)
    }

    return (
        <div>
            <nav>
                <button
                    className={currentPage === 'home' ? 'active' : ''}
                    onClick={() => navigate('home')}
                >
                    Home
                </button>
                <button
                    className={currentPage === 'books' || currentPage === 'details' ? 'active' : ''}
                    onClick={() => navigate('books')}
                >
                    Books List
                </button>
                {selectedBook && (
                    <button
                        className={currentPage === 'details' ? 'active' : ''}
                        onClick={() => navigate('details')}
                    >
                        Book Details
                    </button>
                )}
            </nav>

            <div className="page">
                {currentPage === 'home' && <Home navigate={navigate} />}
                {currentPage === 'books' && (
                    <BooksList books={books} navigate={navigate} />
                )}
                {currentPage === 'details' && selectedBook && (
                    <BookDetails book={selectedBook} navigate={navigate} />
                )}
            </div>
        </div>
    )
}

export default App
