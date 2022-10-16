import { useAppDispatch } from '../../../../../store/hooks';
import { addCollapsedSidebarId, removeCollapsedSidebarId } from '../../../../../store/entities/ui/preferences';

export const useCollapsibleBoxHelper = () => {
  const dispatch = useAppDispatch();

  const handleCollapseChange = (id: string, collapsed?: boolean) => {
    collapsed
      ? dispatch(addCollapsedSidebarId(id))
      : dispatch(removeCollapsedSidebarId(id));
  };

  return {
    handleCollapseChange,
  };
};
