import { SortingState } from '@tanstack/react-table';

export interface UiPreferences {
  sidebarWidth: number;
  middleColumnWidth: number;
  showCompletedTasks?: boolean;
  collapsedAccountIds: number[];
  bookmarks: {
    sortingState: SortingState;
  };
}
