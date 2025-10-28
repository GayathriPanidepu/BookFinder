import React from 'react';
import { BookCard } from './BookCard';
import { BookOpen, Search } from 'lucide-react';

export const BookGrid = ({ books, onBookClick, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-muted rounded-lg aspect-[2/3] mb-4" />
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4" />
              <div className="h-3 bg-muted rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-muted/30 rounded-full p-6 mb-6">
          <Search className="w-16 h-16 text-muted-foreground/50" />
        </div>
        <h3 className="text-2xl font-semibold mb-2 text-foreground">No books found</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Try adjusting your search terms or search by a different criteria (title, author, or subject).
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} onClick={onBookClick} />
      ))}
    </div>
  );
};