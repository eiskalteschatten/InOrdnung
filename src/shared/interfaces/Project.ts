import { Bookmark } from './Bookmark';

export interface ProjectInfo {
  name: string;
  description?: string;
}

export interface Project extends ProjectInfo {
  bookmarks?: Bookmark[];
}
