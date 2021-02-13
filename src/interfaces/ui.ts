export interface SortingOptions {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface UiPreferences {
  openEditTaskDialog: boolean;
  openEditBookmarkDialog: boolean;
  tasksSortingOptions: SortingOptions;
  showCompletedTasks: boolean;
  bookmarksSortingOptions: SortingOptions;
}
