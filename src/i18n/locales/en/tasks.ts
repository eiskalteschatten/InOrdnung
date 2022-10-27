import { TaskStatus } from '../../../shared/interfaces/tasks';

export default {
  tasks: 'Tasks',
  task: 'Task',
  newTask: 'New Task',
  newTaskList: 'New Task List',
  taskList: 'Task List',
  taskLists: 'Task Lists',
  confirmDeleteTaskList: 'This action will permanently delete the selected task list. Any tasks in the list will still be available, but no longer assigned to a list.',
  confirmDeleteTask: 'This action will permanently delete the selected task.',
  allTasks: 'All Tasks',
  useListView: 'Use List View',
  useKanbanBoard: 'Use Kanban Board',
  showCompletedTasks: 'Show Completed Tasks',
  hideCompletedTasks: 'Hide Completed Tasks',
  [TaskStatus.TODO]: 'To Do',
  [TaskStatus.DOING]: 'Doing',
  [TaskStatus.DONE]: 'Done',
  dueDate: 'Due Date',
  editTask: 'Edit Task',
  deleteTask: 'Delete Task',
};
