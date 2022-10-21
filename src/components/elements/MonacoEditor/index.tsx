import React, { useEffect, useMemo } from 'react';
import Editor, { EditorProps, useMonaco } from '@monaco-editor/react';

import Spinner from '../Spinner';
import { useAppSelector } from '../../../store/hooks';

import styles from './styles.module.scss';

const MonacoEditor: React.FC<EditorProps> = ({ theme, defaultLanguage, ...leftoverProps }) => {
  const { prefersDarkMode } = useAppSelector(state => state.app);
  const monaco = useMonaco();

  const _theme = useMemo(() => {
    if (theme) {
      return theme;
    }

    return prefersDarkMode ? 'vs-dark' : 'light';
  }, [theme, prefersDarkMode]);

  useEffect(() => {
    // monaco?.editor
  }, []);

  return (
    <Editor
      theme={_theme}
      defaultLanguage={defaultLanguage || 'markdown'}
      loading={<Spinner className={styles.loader} />}
      {...leftoverProps}
    />
  );
};

export default MonacoEditor;
