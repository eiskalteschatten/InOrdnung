import { v4 as uuidv4 } from 'uuid';

import { KanbanBoard } from '../../interfaces/kanban';
import { getTranslation } from '../../lib/helper';

const translations = getTranslation();

const defaultBoard: KanbanBoard = {
  id: uuidv4(),
  name: 'Default Board',
  columns: [
    {
      id: uuidv4(),
      name: translations.kanbanToDo,
      isDoneColumn: false,
    },
    {
      id: uuidv4(),
      name: translations.kanbanDoing,
      isDoneColumn: false,
    },
    {
      id: uuidv4(),
      name: translations.kanbanDone,
      isDoneColumn: true,
    },
  ],
};

export default defaultBoard;
