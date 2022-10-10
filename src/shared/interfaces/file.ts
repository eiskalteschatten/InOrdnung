import { Project } from './project';
import { UiPreferences } from './ui';

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
}
