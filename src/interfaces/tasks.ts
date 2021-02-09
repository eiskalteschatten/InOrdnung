export interface Task {
  id?: string;
  name?: string;
  note?: string;
  hasDueDate?: boolean;
  dueDate?: string;
  hasDueTime?: boolean;
  dueTime?: string;
  completed?: boolean;
}
