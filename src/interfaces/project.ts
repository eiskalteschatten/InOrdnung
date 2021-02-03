export interface ProjectImage {
  image: string;
  mimeType: string;
}
export interface ProjectInfo {
  name?: string;
  description?: string;
  image?: ProjectImage;
  hasStartDate?: boolean;
  startDate?: string;
  hasEndDate?: boolean;
  endDate?: string;
}

export interface ProjectFileMetaData {
  fileLoaded?: boolean;
  path: string;
  saved?: boolean;
}


export interface Project {
  projectInfo: ProjectInfo;
}

export interface ProjectFile {
  project: Project;
}
