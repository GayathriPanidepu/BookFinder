import React from 'react';
import { BookOpen, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const Header = ({ favoritesCount, onShowFavorites }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary rounded-lg p-2">
              <BookOpen className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Book Finder</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Discover your next great read</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onShowFavorites}
            className="relative gap-2 hover:bg-accent hover:text-accent-foreground transition-book"
          >
            <Heart className="h-4 w-4" />
            <span className="hidden sm:inline">Favorites</span>
            {favoritesCount > 0 && (
              <Badge className="ml-1 bg-accent text-accent-foreground border-0 px-2 py-0 h-5 min-w-[20px] rounded-full">
                {favoritesCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};