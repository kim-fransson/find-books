interface BookCardProps {
  book: Book;
}
export const BookCard = ({ book }: BookCardProps) => {
  const { coverId, title, authors } = book;
  return (
    <div className="py-4 px-8 border-l-8 border-primary grid grid-cols-[1fr_auto] gap-5 rounded bg-white shadow-card">
      <div className="flex flex-col min-w-0">
        <span className="text-2xl font-semibold line-clamp-2">{title}</span>
        <span className="text-primary truncate">{authors.join(", ")}</span>
      </div>
      <img
        src={`https://covers.openlibrary.org/b/id/${coverId}-S.jpg`}
        alt="cover illustration"
        className=" justify-self-end"
        loading="lazy"
      />
    </div>
  );
};
