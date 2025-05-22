import { fetcher } from "@/lib/utils";
import useSWR from "swr";

const mapToBookPage = (apiResponse?: SearchResponse): BookPage | undefined => {
  if (!apiResponse) {
    return;
  }
  return {
    total: apiResponse.numFound,
    books: apiResponse.docs.map(
      (doc): Book => ({
        title: doc.title,
        id: doc.key,
        authors: doc.author_name ?? [],
        coverId: doc.cover_i,
        publishedYear: doc.first_publish_year,
      })
    ),
  };
};

export const useBookPage = (index = 1, limit = 15, query = "", sort = "") => {
  const { data, error, isLoading } = useSWR<SearchResponse>(
    `https://openlibrary.org/search.json?q=${query}&page=${index}&limit=${limit}&sort=${sort}`,
    fetcher
  );

  const page = mapToBookPage(data);

  return {
    page,
    isLoading,
    isError: error,
  };
};
