export interface Bookmark {
  id?: string;
  name?: string;
  url?: string;
}

export interface BookmarkSortingOptions {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}
