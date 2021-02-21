export interface KanbanTask {
  id?: string;
  taskNumber?: string;
  title?: string;
  description?: string;
  columnId?: string;
  finished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface KanbanBoardColumn {
  id?: string;
  name?: string;
  isDoneColumn?: boolean;
}

export interface KanbanBoard {
  id?: string;
  name?: string;
  columns?: KanbanBoardColumn[];
}

export interface Kanban {
  tasks: KanbanTask[];
  boards: KanbanBoard[];
}
