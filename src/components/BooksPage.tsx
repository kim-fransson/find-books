import { useBookPage } from "@/hooks";
import { getPaginationItems } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";
import { BookCard, BookCardSkeleton } from "./BookCard";

const BOOK_PAGE_LIMIT = 15;

interface BooksPageProps {
  index: number;
  searchQuery?: string;
  sort?: string;
  onIndexChange?: (index: number) => void;
}

export const BooksPage = ({
  index,
  searchQuery,
  sort,
  onIndexChange = () => {},
}: BooksPageProps) => {
  const { page, isLoading, isError } = useBookPage(
    index,
    BOOK_PAGE_LIMIT,
    searchQuery,
    sort
  );

  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: BOOK_PAGE_LIMIT }).map((_, index) => (
          <BookCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError || !page) {
    return (
      <div className="grid place-items-center">
        <h2 className="text-3xl font-bold">
          No! An{" "}
          <span className="rounded inline-block bg-red-400 text-white p-1 -rotate-3">
            error
          </span>{" "}
          popped up.
        </h2>
      </div>
    );
  }

  if (page.total === 0) {
    return (
      <div className="grid place-items-center">
        <h2 className="text-3xl font-bold">
          {searchQuery
            ? `No books could be found...`
            : `Search for books to get started.`}
        </h2>
      </div>
    );
  }

  const totalPages = Math.ceil(page.total / BOOK_PAGE_LIMIT);
  const currentPage = index;

  const paginationItems = getPaginationItems(currentPage, totalPages);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onIndexChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onIndexChange(currentPage + 1);
    }
  };

  return (
    <div className="grid  gap-8">
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 self-start">
        <h2 className="sr-only">{`Books found for: ${searchQuery}`}</h2>
        {page?.books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </section>
      <Pagination className="self-end">
        <PaginationContent className="bg-white rounded-2xl shadow-card p-2">
          <PaginationItem>
            <PaginationPrevious href="#" onClick={handlePreviousPage} />
          </PaginationItem>

          {paginationItems.map((item, index) => {
            if (!item) {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            } else {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === item}
                    onClick={() => onIndexChange(item)}
                  >
                    {item}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}

          <PaginationItem>
            <PaginationNext href="#" onClick={handleNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
