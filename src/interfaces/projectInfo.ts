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
