export interface SortingOptions {
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export type PrimaryColor = 'blue' | 'red' | 'yellow' | 'green' | 'pink' | 'purple' | 'deepPurple' | 'indigo' | 'lightBlue' | 'cyan' | 'teal' | 'lightGreen' | 'lime' | 'amber' | 'orange' | 'deepOrange' | 'brown' | 'grey' | 'blueGrey';

export interface UiPreferences {
  sidebarWidth?: number;
  tasksSortingOptions: SortingOptions;
  showCompletedTasks: boolean;
  bookmarksSortingOptions: SortingOptions;
  primaryColor?: PrimaryColor;
}
