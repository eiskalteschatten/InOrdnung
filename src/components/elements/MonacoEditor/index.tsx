import React, { useMemo, useRef } from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';
import { editor as editorApi } from 'monaco-editor/esm/vs/editor/editor.api';

import Spinner from '../Spinner';
import { useAppSelector } from '../../../store/hooks';
import LightTheme from '../../../shared/monacoThemes/InOrdnungLight.json';

import styles from './styles.module.scss';

const lightThemeName = 'InOrdnungLight';

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

  const handleEditorDidMount = (editor: editorApi.IStandaloneCodeEditor, monaco: any) => {
    editorRef.current = editor;

    editor.updateOptions({
      minimap: { enabled: minimap },
      readOnly,
      lineNumbers,
    });

    monaco.editor.defineTheme(lightThemeName, LightTheme as any);

    // Don't use prefersDarkMode here because this code is run before the store is set
    if (window.matchMedia && !window.matchMedia('(prefers-color-scheme: dark)').matches) {
      monaco.editor.setTheme(lightThemeName);
    }
  };

  const _theme = useMemo(() => {
    if (theme) {
      return theme;
    }

    if (!prefersDarkMode) {
      return lightThemeName;
    }

    return prefersDarkMode ? 'vs-dark' : lightThemeName;
  }, [theme, prefersDarkMode]);

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
