import { ProjectInfo } from './projectInfo';
import { Task } from './tasks';
import { Bookmark } from './bookmarks';
import { UiPreferences } from './ui';

export interface Project {
  projectInfo: ProjectInfo;
  tasks: Task[];
  bookmarks: Bookmark[];
}

export interface ProjectFileMetaData {
  fileLoaded?: boolean;
  path: string;
  saved?: boolean;
}
export interface ProjectFile {
  project: Project;
  ui: UiPreferences;
}

export interface RecentProjectsLocalStorage {
  name?: string;
  path: string;
  thumbnail?: string;
  thumbnailMimeType?: string;
}
