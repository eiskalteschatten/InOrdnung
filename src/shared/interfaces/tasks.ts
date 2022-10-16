export interface TaskList {
  id: string;
  name: string;
  view: TaskListViewType;
}

export interface Task {
  id: string;
  taskListId?: string;
  status: TaskStatus;
  name: string;
  description?: string;
}

export enum TaskListViewType {
  LIST = 'list',
  KANBAN_BOARD = 'kanbanBoard',
}

export enum TaskStatus {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
}
