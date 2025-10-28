import React from 'react';
import { BookOpen, Calendar, User, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export const BookCard = ({ book, onClick }) => {
  const {
    title,
    authors,
    publishYear,
    coverUrl,
    rating,
    subjects
  } = book;

  return (
    <Card 
      className="group cursor-pointer transition-book hover:book-card-shadow-hover book-card-shadow overflow-hidden border-border bg-card h-full flex flex-col"
      onClick={() => onClick(book)}
    >
      <div className="relative aspect-[2/3] overflow-hidden bg-muted">
        {coverUrl ? (
          <img
            src={coverUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = `
                <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                  <svg class="w-16 h-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              `;
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
            <BookOpen className="w-16 h-16 text-muted-foreground/30" />
          </div>
        )}
        
        {rating && (
          <div className="absolute top-2 right-2 bg-card/95 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1 shadow-lg">
            <Star className="w-3 h-3 fill-accent text-accent" />
            <span className="text-xs font-semibold text-foreground">{rating}</span>
          </div>
        )}
      </div>

      <CardContent className="p-4 flex-1 flex flex-col">
        <h3 className="font-semibold text-base line-clamp-2 mb-2 text-foreground group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>

        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{authors.join(', ')}</span>
          </div>

          {publishYear && (
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{publishYear}</span>
            </div>
          )}
        </div>

        {subjects && subjects.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {subjects.slice(0, 2).map((subject, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-secondary/50 hover:bg-secondary text-secondary-foreground border-0"
              >
                {subject}
              </Badge>
            ))}
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          className="mt-auto w-full text-primary hover:text-primary-foreground hover:bg-primary transition-book"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};