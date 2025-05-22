interface BookPage {
  total: number;
  books: Book[];
}

interface Book {
  id: string;
  title: string;
  authors: string[];
  coverId?: number;
  publishedYear: number;
}
