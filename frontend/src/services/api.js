import axios from 'axios';

const OPEN_LIBRARY_BASE = 'https://openlibrary.org';

/**
 * Search books using Open Library API
 * @param {string} query - Search query
 * @param {string} searchType - Type of search: 'title', 'author', or 'subject'
 * @param {number} page - Page number for pagination
 * @param {number} limit - Number of results per page
 * @returns {Promise} - Search results
 */
export const searchBooks = async (query, searchType = 'title', page = 1, limit = 20) => {
  try {
    if (!query || query.trim() === '') {
      throw new Error('Search query cannot be empty');
    }

    const params = {
      [searchType]: query.trim(),
      page,
      limit,
      fields: 'key,title,author_name,first_publish_year,isbn,cover_i,publisher,language,number_of_pages_median,ratings_average,subject'
    };

    const response = await axios.get(`${OPEN_LIBRARY_BASE}/search.json`, { params });
    
    return {
      docs: response.data.docs || [],
      numFound: response.data.numFound || 0,
      start: response.data.start || 0
    };
  } catch (error) {
    console.error('Error searching books:', error);
    throw error;
  }
};

/**
 * Get book cover image URL
 * @param {number} coverId - Cover ID from Open Library
 * @param {string} size - Size: 'S', 'M', 'L'
 * @returns {string} - Cover image URL
 */
export const getCoverUrl = (coverId, size = 'M') => {
  if (!coverId) return null;
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
};

/**
 * Get book details by work key
 * @param {string} workKey - Work key (e.g., '/works/OL45804W')
 * @returns {Promise} - Book details
 */
export const getBookDetails = async (workKey) => {
  try {
    const response = await axios.get(`${OPEN_LIBRARY_BASE}${workKey}.json`);
    return response.data;
  } catch (error) {
    console.error('Error fetching book details:', error);
    throw error;
  }
};

/**
 * Format book data for display
 * @param {Object} book - Raw book data from API
 * @returns {Object} - Formatted book data
 */
export const formatBookData = (book) => {
  return {
    id: book.key,
    title: book.title || 'Unknown Title',
    authors: book.author_name || ['Unknown Author'],
    publishYear: book.first_publish_year || null,
    coverUrl: book.cover_i ? getCoverUrl(book.cover_i, 'M') : null,
    coverUrlLarge: book.cover_i ? getCoverUrl(book.cover_i, 'L') : null,
    isbn: book.isbn?.[0] || null,
    publisher: book.publisher?.[0] || null,
    pages: book.number_of_pages_median || null,
    rating: book.ratings_average ? parseFloat(book.ratings_average).toFixed(1) : null,
    subjects: book.subject?.slice(0, 5) || [],
    language: book.language?.[0] || null
  };
};