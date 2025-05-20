import { useState } from "react";
import { BooksPage } from "./components/BooksPage";

const App = () => {
  const [pageIndex, setPageIndex] = useState(1);
  return (
    <div className="min-h-svh flex flex-col">
      <header className="min-h-36 bg-pattern-mobile lg:bg-pattern-desktop"></header>
      <main className="mx-auto bg-red-50 max-w-7xl flex-1 w-full p-4">
        <BooksPage index={pageIndex} onIndexChange={setPageIndex} />
        {/* Pre-render the next page to improve perceived performance */}
        <div style={{ display: "none" }}>
          <BooksPage index={pageIndex + 1} />
        </div>
      </main>
      <footer className="mt-auto min-h-36 bg-pattern-mobile lg:bg-pattern-desktop"></footer>
    </div>
  );
};

export default App;
