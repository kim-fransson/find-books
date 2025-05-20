import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const fetcher = <T>(...args: Parameters<typeof fetch>): Promise<T> =>
  fetch(...args).then((res) => res.json());

export const getPaginationItems = (currentPage: number, totalPages: number) => {
  const pages = [];
  const MAX_ITEMS = 5;

  // Always show the first page
  pages.push(1);

  // If totalPages <= MAX_ITEMS, just list all pages
  if (totalPages <= MAX_ITEMS) {
    for (let i = 2; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Add middle pages with ellipsis logic
  if (currentPage <= 3) {
    for (let i = 2; i <= 4; i++) {
      pages.push(i);
    }
    pages.push(undefined);
  } else if (currentPage >= totalPages - 2) {
    pages.push(undefined);
    for (let i = totalPages - 3; i < totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(undefined);
    pages.push(currentPage - 1);
    pages.push(currentPage);
    pages.push(currentPage + 1);
    pages.push(undefined);
  }

  // Always show the last page
  pages.push(totalPages);

  return pages;
};
