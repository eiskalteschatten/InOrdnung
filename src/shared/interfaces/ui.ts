import { SortingState } from '@tanstack/react-table';

export interface UiPreferences {
  general: GeneralUiPreferences;
  bookmarks?: BookmarksUiPreferences;
  tasks?: TasksUiPreferences;
}

export interface GeneralUiPreferences {
  sidebarWidth: number;
  middleColumnWidth: number;
  rightSidebarWidth: number;
  showCompletedTasks?: boolean;
  collapsedSidebarIds: string[];
}

export interface BookmarksUiPreferences {
  sortingState?: SortingState;
}

export interface TasksUiPreferences {
  sortingState?: SortingState;
  showCompletedTasks?: boolean;
}
