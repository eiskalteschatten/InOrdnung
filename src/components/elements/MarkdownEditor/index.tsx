import React from 'react';
import ReactMarkdownEditor, { MDEditorProps } from '@uiw/react-md-editor';

import styles from './styles.module.scss';

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
        {...leftoverProps}
      />
    </div>
  );
};

export default MarkdownEditor;
