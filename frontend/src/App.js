import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { BookGrid } from './components/BookGrid';
import { BookDetailModal } from './components/BookDetailModal';
import { FavoritesModal } from './components/FavoritesModal';
import { searchBooks, formatBookData } from './services/api';
import { BookOpen } from 'lucide-react';
import '@/App.css';

const FAVORITES_STORAGE_KEY = 'bookfinder_favorites';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isFavoritesModalOpen, setIsFavoritesModalOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  
  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (storedFavorites) {
      try {
        return JSON.parse(storedFavorites);
      } catch (error) {
        console.error('Error loading favorites:', error);
        return [];
      }
    }
    return [];
  });

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query, searchType) => {
    setIsLoading(true);
    setHasSearched(true);
    try {
      const result = await searchBooks(query, searchType, 1, 50);
      const formattedBooks = result.docs.map(formatBookData);
      setBooks(formattedBooks);
      
      if (formattedBooks.length === 0) {
        toast.info('No books found', {
          description: 'Try adjusting your search terms or criteria.'
        });
      } else {
        toast.success('Search completed', {
          description: `Found ${result.numFound} books`
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast.error('Search failed', {
        description: 'Please check your internet connection and try again.'
      });
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
    setIsDetailModalOpen(true);
  };

  const handleToggleFavorite = () => {
    if (!selectedBook) return;

    const isFavorite = favorites.some(fav => fav.id === selectedBook.id);
    
    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.id !== selectedBook.id));
      toast.success('Removed from favorites', {
        description: `${selectedBook.title} has been removed from your favorites.`
      });
    } else {
      setFavorites([...favorites, selectedBook]);
      toast.success('Added to favorites', {
        description: `${selectedBook.title} has been added to your favorites.`
      });
    }
  };

  const handleClearFavorites = () => {
    setFavorites([]);
    toast.success('Favorites cleared', {
      description: 'All favorites have been removed.'
    });
  };

  const isFavorite = selectedBook && favorites.some(fav => fav.id === selectedBook.id);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        favoritesCount={favorites.length} 
        onShowFavorites={() => setIsFavoritesModalOpen(true)}
      />

      {/* Hero Section */}
      <section className="relative gradient-hero border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-foreground leading-tight">
              Discover Your Next
              <br />
              <span className="text-gradient-literary">Great Read</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Search through millions of books from the Open Library collection. Find your next adventure by title, author, or subject.
            </p>
          </div>

          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </section>

      {/* Results Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {hasSearched ? (
          <>
            {books.length > 0 && (
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-foreground">
                  Search Results
                  <span className="text-muted-foreground font-normal text-lg ml-3">
                    ({books.length} {books.length === 1 ? 'book' : 'books'})
                  </span>
                </h3>
              </div>
            )}
            <BookGrid 
              books={books} 
              onBookClick={handleBookClick} 
              isLoading={isLoading}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4">
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-full p-8 mb-8">
              <BookOpen className="w-20 h-20 text-primary" />
            </div>
            <h3 className="text-3xl font-bold mb-3 text-foreground">Start Your Search</h3>
            <p className="text-muted-foreground text-center max-w-md text-lg leading-relaxed">
              Use the search bar above to find books by title, author, or subject. Explore millions of books from the Open Library.
            </p>
          </div>
        )}
      </section>

      {/* Book Detail Modal */}
      <BookDetailModal
        book={selectedBook}
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={isFavorite}
      />

      {/* Favorites Modal */}
      <FavoritesModal
        favorites={favorites}
        isOpen={isFavoritesModalOpen}
        onClose={() => setIsFavoritesModalOpen(false)}
        onBookClick={handleBookClick}
        onClearFavorites={handleClearFavorites}
      />

      <Toaster richColors position="top-right" />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;