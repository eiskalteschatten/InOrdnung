import React, { useCallback, MutableRefObject } from 'react';
import { useDispatch } from 'react-redux';
import { debounce } from 'lodash';

import { makeStyles, Theme } from '@material-ui/core/styles';

import { uiSetSidebarWidth } from '../../../../store/actions/uiActions';

const useStyles = makeStyles((theme: Theme) => ({
  sidebarDragger: {
    width: 3,
    height: '100%',
    position: 'absolute',
    right: 0,
    top: 0,
    cursor: 'ew-resize',
    '&:hover': {
      background: theme.palette.primary.main,
    },
  },
}));

interface Props {
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
  setSidebarWidth: Function;
}

const SidebarDragger: React.FC<Props> = ({ sidebarRef, setSidebarWidth }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const minWidth = 200;
    const rect = sidebarRef.current?.getBoundingClientRect();
    const startCursorX = e.pageX;

    const handleMouseMove = debounce((e: any): void => {
      if (rect) {
        const newWidth = Math.max(rect.width + (e.pageX - startCursorX), minWidth);
        setSidebarWidth(newWidth);
      }
    }, 1);

    const handleMouseUp = (): void => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      const rect = sidebarRef.current?.getBoundingClientRect();
      dispatch(uiSetSidebarWidth(rect?.width));
    };

    e.preventDefault();
    e.stopPropagation();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, []);

  return (
    <div
      className={classes.sidebarDragger}
      onMouseDown={handleMouseDown}
    />
  );
};

export default SidebarDragger;
