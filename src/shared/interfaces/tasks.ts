export interface TaskList {
  id: string;
  name: string;
  view: TaskListViewType;
}

export interface Task {
  id: string;
  number: number;
  taskListId?: string;
  status: TaskStatus;
  name: string;
  description?: string;
  dueDate?: string;
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
