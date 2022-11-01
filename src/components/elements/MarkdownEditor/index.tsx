import React from 'react';
import ReactMarkdownEditor, { MDEditorProps } from '@uiw/react-md-editor';

import styles from './styles.module.scss';
import './overrides.scss';

interface Props extends MDEditorProps {
  label?: string;
}

const MarkdownEditor: React.FC<Props> = ({ label, preview, ...leftoverProps }) => {
  return (
    <div>
      {label && (
        <div className={styles.label}>{label}:</div>
      )}

      <ReactMarkdownEditor
        toolbarBottom={true}
        preview={preview ? preview : 'edit'}
        className={styles.editor}
        {...leftoverProps}
      />
    </div>
  );
};

export default MarkdownEditor;
