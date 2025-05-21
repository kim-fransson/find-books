import { useEffect, useState } from "react";
import { BooksPage } from "./components/BooksPage";
import { SearchField } from "./components/SearchField";
import { useLocalStorage } from "@uidotdev/usehooks";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [pageIndex, setPageIndex] = useLocalStorage("currentPage", 1);
  const [fieldKey, setFieldKey] = useLocalStorage("fieldKey", "all");
  const [searchTerm, setSearchTerm] = useLocalStorage(
    "searchTerm",
    "He Who Fights with Monsters"
  );
  const [sort, setSort] = useLocalStorage("sort", "");

  useEffect(() => {
    if (fieldKey === "all") {
      setSearchQuery(searchTerm);
    } else {
      setSearchQuery(`${fieldKey}:${searchTerm}`);
    }
  }, [searchTerm, fieldKey]);

  return (
    <div className="min-h-svh flex flex-col">
      <h1 className="sr-only">Find Books</h1>
      <header className="min-h-36 bg-pattern-mobile lg:bg-pattern-desktop relative">
        <SearchField
          fieldKey={fieldKey}
          searchTerm={searchTerm}
          sort={sort}
          onFieldKeyChange={setFieldKey}
          onSearchTermChange={setSearchTerm}
          onSortChange={setSort}
        />
      </header>
      <main className="mx-auto  max-w-7xl flex-1 w-full grid px-8 py-16">
        <BooksPage
          index={pageIndex}
          searchQuery={searchQuery}
          sort={sort}
          onIndexChange={setPageIndex}
        />
        {/* Pre-render the next page to improve perceived performance */}
        <div style={{ display: "none" }}>
          <BooksPage
            index={pageIndex + 1}
            searchQuery={searchQuery}
            sort={sort}
          />
        </div>
      </main>
      <footer className="mt-auto min-h-36 bg-pattern-mobile lg:bg-pattern-desktop"></footer>
    </div>
  );
};

export default App;
