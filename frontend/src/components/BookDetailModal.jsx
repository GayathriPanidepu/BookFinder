import React from 'react';
import { X, User, Calendar, BookOpen, Globe, Hash, Star, Building2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';

export const BookDetailModal = ({ book, isOpen, onClose, onToggleFavorite, isFavorite }) => {
  if (!book) return null;

  const {
    title,
    authors,
    publishYear,
    coverUrlLarge,
    isbn,
    publisher,
    pages,
    rating,
    subjects,
    language
  } = book;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0 gap-0 bg-card">
        <DialogHeader className="px-6 pt-6 pb-4">
          <div className="flex items-start justify-between">
            <DialogTitle className="text-2xl font-bold pr-8 leading-tight text-foreground">
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-120px)] px-6 pb-6 custom-scrollbar">
          <div className="grid md:grid-cols-[300px,1fr] gap-8">
            {/* Book Cover */}
            <div className="space-y-4">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg book-card-shadow">
                {coverUrlLarge ? (
                  <img
                    src={coverUrlLarge}
                    alt={title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                          <svg class="w-24 h-24 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                      `;
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                    <BookOpen className="w-24 h-24 text-muted-foreground/30" />
                  </div>
                )}
              </div>

              <Button
                onClick={onToggleFavorite}
                variant={isFavorite ? "default" : "outline"}
                className="w-full transition-book"
              >
                {isFavorite ? '♥ Remove from Favorites' : '♡ Add to Favorites'}
              </Button>
            </div>

            {/* Book Details */}
            <div className="space-y-6">
              {/* Authors */}
              <div>
                <div className="flex items-center gap-2 text-muted-foreground mb-2">
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Author{authors.length > 1 ? 's' : ''}</span>
                </div>
                <p className="text-base font-medium text-foreground">{authors.join(', ')}</p>
              </div>

              <Separator />

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4">
                {publishYear && (
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-xs font-medium">Published</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{publishYear}</p>
                  </div>
                )}

                {pages && (
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <BookOpen className="w-4 h-4" />
                      <span className="text-xs font-medium">Pages</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{pages}</p>
                  </div>
                )}

                {rating && (
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Star className="w-4 h-4" />
                      <span className="text-xs font-medium">Rating</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-accent text-accent" />
                      <p className="text-sm font-semibold text-foreground">{rating} / 5</p>
                    </div>
                  </div>
                )}

                {language && (
                  <div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Globe className="w-4 h-4" />
                      <span className="text-xs font-medium">Language</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground uppercase">{language}</p>
                  </div>
                )}

                {publisher && (
                  <div className="col-span-2">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Building2 className="w-4 h-4" />
                      <span className="text-xs font-medium">Publisher</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{publisher}</p>
                  </div>
                )}

                {isbn && (
                  <div className="col-span-2">
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <Hash className="w-4 h-4" />
                      <span className="text-xs font-medium">ISBN</span>
                    </div>
                    <p className="text-sm font-mono text-foreground">{isbn}</p>
                  </div>
                )}
              </div>

              {/* Subjects */}
              {subjects && subjects.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-3">Subjects & Categories</h4>
                    <div className="flex flex-wrap gap-2">
                      {subjects.map((subject, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="bg-secondary/50 hover:bg-secondary text-secondary-foreground border-0"
                        >
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};