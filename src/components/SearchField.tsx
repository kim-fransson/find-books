import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";

interface SearchFieldProps {
  fieldKey: string;
  onFieldKeyChange?: (value: string) => void;
  searchTerm?: string;
  onSearchTermChange?: (value: string) => void;
  sort?: string;
  onSortChange?: (value: string) => void;
}

export const SearchField = ({
  fieldKey,
  onFieldKeyChange = () => {},
  searchTerm,
  onSearchTermChange = () => {},
  sort,
  onSortChange = () => {},
}: SearchFieldProps) => {
  const [internalSearchTerm, setInternalSearchTerm] = useState(searchTerm);
  const debouncedSearchTerm = useDebounce(internalSearchTerm, 500);

  useEffect(() => {
    onSearchTermChange(debouncedSearchTerm || "");
  }, [debouncedSearchTerm, onSearchTermChange]);

  return (
    <div className="bg-white rounded-2xl p-4 absolute w-full max-w-4xl -translate-1/2 left-1/2 bottom-0 shadow-card translate-y-1/2">
      <div className="flex">
        <Select value={fieldKey} onValueChange={onFieldKeyChange}>
          <SelectTrigger className="w-24 rounded-r-none">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="title">Title</SelectItem>
            <SelectItem value="author">Author</SelectItem>
          </SelectContent>
        </Select>

        <Input
          value={internalSearchTerm}
          onChange={(e) => setInternalSearchTerm(e.target.value)}
          className="rounded-none"
        />

        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="w-32 rounded-l-none">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="title">Title (A-Z)</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="want_to_read">Trending</SelectItem>
            <SelectItem value="new">New</SelectItem>
            <SelectItem value="old">Oldies</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
