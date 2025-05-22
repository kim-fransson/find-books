import { BookCheck, ExternalLink } from "lucide-react";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

interface BookCardProps {
  book: Book;
}
export const BookCard = ({ book }: BookCardProps) => {
  const { coverId, title, authors, publishedYear } = book;
  return (
    <div className="py-4 px-8 border-l-8 border-primary grid grid-cols-[1fr_auto] gap-5 rounded bg-white shadow-card">
      <div className="flex flex-col min-w-0">
        <span className="text-2xl font-semibold line-clamp-2">{title}</span>
        <span className="text-primary truncate">{authors.join(", ")}</span>
      </div>
      <img
        src={`https://covers.openlibrary.org/b/id/${coverId}-S.jpg`}
        alt="cover illustration"
        className="justify-self-end"
        loading="lazy"
      />
      <div className="flex justify-between col-span-2 gap-4 self-end">
        <Badge>
          <BookCheck />
          Published: {publishedYear}
        </Badge>

        <Button variant="link">
          <a
            href={`https://openlibrary.org${book.id}`}
            target="_blank"
            className="flex gap-2 items-center"
          >
            <ExternalLink /> Read more
          </a>
        </Button>
      </div>
    </div>
  );
};

export const BookCardSkeleton = () => {
  return (
    <div className="py-4 px-8 border-l-8 border-primary grid grid-cols-[1fr_auto] gap-5 rounded bg-white shadow-card">
      <div className="flex flex-col min-w-0 gap-2">
        <Skeleton className="h-16 w-56 rounded" />
        <Skeleton className="h-6 w-40 rounded" />
      </div>
      <Skeleton className="rounded w-10 h-14" />
    </div>
  );
};
