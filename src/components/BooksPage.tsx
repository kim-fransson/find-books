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
    return <span>Loading...</span>;
  }

  if (isError || !page) {
    return <span>Error!!!</span>;
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
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-4">
        {page?.books.map((book) => (
          <div
            key={book.id}
            className="shadow-2xl p-4 flex flex-col gap-4 bg-red-500 text-black text-lg font-bold"
          >
            <span>{book.title}</span>
            <span>{book.authors.join(",")}</span>
          </div>
        ))}
      </div>
      <Pagination>
        <PaginationContent>
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
