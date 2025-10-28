import React, { useState } from 'react';
import { Search, BookOpen } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query, searchType);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <Input
            type="text"
            placeholder="Search for books..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
            className="pl-12 pr-32 h-14 text-base bg-card border-border focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-transparent transition-all shadow-sm hover:shadow-md"
          />
          <Button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 h-10 bg-primary hover:bg-primary/90 text-primary-foreground transition-book"
          >
            {isLoading ? (
              <>
                <BookOpen className="mr-2 h-4 w-4 animate-pulse" />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </Button>
        </div>
      </form>

      <Tabs value={searchType} onValueChange={setSearchType} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="title" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            By Title
          </TabsTrigger>
          <TabsTrigger value="author" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            By Author
          </TabsTrigger>
          <TabsTrigger value="subject" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            By Subject
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};