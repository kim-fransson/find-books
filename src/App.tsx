import { useEffect, useState } from "react";
import { BooksPage } from "./components/BooksPage";
import { SearchField } from "./components/SearchField";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [pageIndex, setPageIndex] = useState(1);
  const [fieldKey, setFieldKey] = useState("all");
  const [searchTerm, setSearchTerm] = useState("Hollow");
  const [sort, setSort] = useState("");

  useEffect(() => {
    if (fieldKey === "all") {
      setSearchQuery(searchTerm);
    } else {
      setSearchQuery(`${fieldKey}:${searchTerm}`);
    }
  }, [searchTerm, fieldKey]);

  return (
    <div className="min-h-svh flex flex-col">
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
      <main className="mx-auto  max-w-7xl flex-1 w-full px-8 py-16">
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
