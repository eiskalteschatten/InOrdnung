export interface Task {
  id?: string;
  name?: string;
  note?: string;
  hasDueDate?: boolean;
  dueDate?: string;
  completed?: boolean;
}
