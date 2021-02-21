export interface SortingOptions {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export interface UiPreferences {
  sidebarWidth?: number;
  openEditTaskDialog: boolean;
  openEditQuickNoteDialog: boolean;
  openEditBookmarkDialog: boolean;
  openEditKanbanTaskDialog: boolean;
  tasksSortingOptions: SortingOptions;
  showCompletedTasks: boolean;
  bookmarksSortingOptions: SortingOptions;
}
