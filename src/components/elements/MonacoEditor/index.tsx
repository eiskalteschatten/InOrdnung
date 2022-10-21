import React, { useEffect, useMemo, useRef } from 'react';
import Editor, { EditorProps, useMonaco } from '@monaco-editor/react';
import { editor as editorApi } from 'monaco-editor/esm/vs/editor/editor.api';

import Spinner from '../Spinner';
import { useAppSelector } from '../../../store/hooks';

import styles from './styles.module.scss';

interface Props extends EditorProps {
  minimap?: boolean;
  readOnly?: boolean;
  lineNumbers?: editorApi.LineNumbersType;
}

const MonacoEditor: React.FC<Props> = props => {
  const {
    theme,
    defaultLanguage = 'markdown',
    minimap = true,
    readOnly,
    lineNumbers = 'off',
    ...leftoverProps
  } = props;

  const { prefersDarkMode } = useAppSelector(state => state.app);
  const editorRef = useRef<editorApi.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (editor: editorApi.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };

  const _theme = useMemo(() => {
    if (theme) {
      return theme;
    }

    return prefersDarkMode ? 'vs-dark' : 'light';
  }, [theme, prefersDarkMode]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({ theme: prefersDarkMode ? 'vs-dark' : 'light' });
    }
  }, [prefersDarkMode]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.updateOptions({
        minimap: { enabled: minimap },
        readOnly,
        lineNumbers,
      });
    }
  }, [minimap, readOnly, lineNumbers]);

  return (
    <Editor
      theme={_theme}
      defaultLanguage={defaultLanguage}
      loading={<Spinner className={styles.loader} />}
      onMount={handleEditorDidMount}
      {...leftoverProps}
    />
  );
};

export default MonacoEditor;
