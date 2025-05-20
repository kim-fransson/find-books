interface SearchResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  num_found: number;
  documentation_url: string;
  q: string;
  offset: number | null;
  docs: Doc[];
}

interface Doc {
  author_key?: string[];
  author_name?: string[];
  cover_edition_key?: string;
  cover_i?: number;
  ebook_access: "borrowable" | "printdisabled" | "no_ebook";
  edition_count: number;
  first_publish_year: number;
  has_fulltext: boolean;
  ia?: string[];
  ia_collection_s?: string;
  key: string;
  language?: string[];
  public_scan_b: boolean;
  title: string;
  lending_edition_s?: string;
  lending_identifier_s?: string;
}
