export interface SortingOptions {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface UiPreferences {
  sidebarWidth: number;
  middleColumnWidth: number;
  tasksSortingOptions?: SortingOptions;
  showCompletedTasks?: boolean;
  bookmarksSortingOptions: SortingOptions;
  collapsedAccountIds: number[];
}
