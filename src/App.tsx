import { useEffect, useState } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

import { BooksPage, PreRenderBookPage } from "./components/BooksPage";
import { SearchToolbar } from "./components/SearchToolbar";

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
    <div className="min-h-svh grid grid-rows-[min-content_1fr]">
      <h1 className="sr-only">Find Books</h1>
      <SearchToolbar
        fieldKey={fieldKey}
        searchTerm={searchTerm}
        sort={sort}
        onFieldKeyChange={setFieldKey}
        onSearchTermChange={setSearchTerm}
        onSortChange={setSort}
      />
      <main className="max-w-7xl px-8 py-16 grid justify-self-center">
        <BooksPage
          index={pageIndex}
          searchQuery={searchQuery}
          sort={sort}
          onIndexChange={setPageIndex}
        />
        <PreRenderBookPage
          index={pageIndex + 1}
          searchQuery={searchQuery}
          sort={sort}
        />
      </main>
    </div>
  );
};

export default App;
