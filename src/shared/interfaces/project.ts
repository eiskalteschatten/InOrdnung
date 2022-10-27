import { Bookmark } from './bookmarks';
import { Task, TaskList } from './tasks';

export interface ProjectInfo {
  name: string;
  description?: string;
}

export interface Project {
  info: ProjectInfo;
  bookmarks?: Bookmark[];
  currentTaskNumber: number;
  tasks?: Task[];
  taskLists?: TaskList[];
}
