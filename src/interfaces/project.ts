export interface ProjectInfo {
  name?: string;
  description?: string;
  image?: string;
  hasStartDate?: boolean;
  startDate?: Date;
  hasEndDate?: boolean;
  endDate?: Date;
}

export interface ProjectFileMetaData {
  fileLoaded: boolean;
  path: string;
  saved: boolean;
}

export interface ProjectFile {
  projectInfo: ProjectInfo;
}
