import React, { createContext, useState } from 'react';

export const Context = createContext({
  editColumnId: '',
  setEditColumnId: (columnId: string) => {},  // eslint-disable-line @typescript-eslint/no-unused-vars
});

interface Props {
  children?: any;
}

export const KanbanContextWrapper: React.FC<Props> = ({ children }) => {
  const [editColumnId, setEditColumnId] = useState<string>('');

  return (
    <Context.Provider value={{
      editColumnId,
      setEditColumnId,
    }}>
      {children}
    </Context.Provider>
  );
};
