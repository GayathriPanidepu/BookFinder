import React from 'react';
import { Heart, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Button } from './ui/button';
import { BookCard } from './BookCard';

export const FavoritesModal = ({ favorites, isOpen, onClose, onBookClick, onClearFavorites }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] p-0 gap-0 bg-card">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-accent/10 rounded-lg p-2">
                <Heart className="h-5 w-5 text-accent fill-accent" />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold text-foreground">
                  My Favorites
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {favorites.length} {favorites.length === 1 ? 'book' : 'books'} saved
                </p>
              </div>
            </div>
            {favorites.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={onClearFavorites}
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                Clear All
              </Button>
            )}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-140px)] px-6 py-6 custom-scrollbar">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4">
              <div className="bg-muted/30 rounded-full p-6 mb-6">
                <Heart className="w-16 h-16 text-muted-foreground/50" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">No favorites yet</h3>
              <p className="text-muted-foreground text-center max-w-md">
                Start adding books to your favorites by clicking the heart icon on any book detail page.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {favorites.map((book) => (
                <BookCard key={book.id} book={book} onClick={onBookClick} />
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};