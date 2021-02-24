export interface SortingOptions {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface UiPreferences {
  sidebarWidth?: number;
  tasksSortingOptions: SortingOptions;
  showCompletedTasks: boolean;
  bookmarksSortingOptions: SortingOptions;
}
