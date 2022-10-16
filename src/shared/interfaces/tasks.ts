export interface TaskList {
  id: string;
  name: string;
  view: TaskViewType;
}

export interface Task {
  id: string;
  taskListId?: string;
  status: TaskStatus;
  name: string;
  description?: string;
}

export enum TaskViewType {
  LIST = 'list',
  KANBAN_BOARD = 'kanbanBoard',
}

export enum TaskStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}
