import { SortingState } from '@tanstack/react-table';

export interface UiPreferences {
  sidebarWidth: number;
  middleColumnWidth: number;
  rightSidebarWidth: number;
  showCompletedTasks?: boolean;
  collapsedSidebarIds: string[];
  bookmarks: {
    sortingState: SortingState;
  };
}
