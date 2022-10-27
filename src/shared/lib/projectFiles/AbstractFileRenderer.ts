export default abstract class AbstractFileRenderer<ProjectFile> {
  abstract serializeProjectForSaving(): ProjectFile
  abstract setProjectFromFile(projectFile: ProjectFile, path: string): void
}
