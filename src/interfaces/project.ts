export interface ProjectInfo {
  name?: string;
  description?: string;
  image?: string;
  hasStartDate?: boolean;
  startDate?: string;
  hasEndDate?: boolean;
  endDate?: string;
}

export interface ProjectFileMetaData {
  fileLoaded: boolean;
  path: string;
  saved: boolean;
}

export interface ProjectFile {
  projectInfo: ProjectInfo;
}
