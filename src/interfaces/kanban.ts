export interface KanbanTask {
  id?: string;
  taskNumber?: string;
  title?: string;
  description?: string;
  boardId?: string;
  column?: number;
  finished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
