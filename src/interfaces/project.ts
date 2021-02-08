import { ProjectInfo } from './projectInfo';
import { Bookmark } from './bookmarks';

export interface Project {
  projectInfo: ProjectInfo;
  bookmarks: Bookmark[];
}

export interface ProjectFileMetaData {
  fileLoaded?: boolean;
  path: string;
  saved?: boolean;
}
export interface ProjectFile {
  project: Project;
}

export interface RecentProjectsLocalStorage {
  name?: string;
  path: string;
  thumbnail?: string;
  thumbnailMimeType?: string;
}
