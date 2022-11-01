import React from 'react';
import ReactMarkdownEditor, { MDEditorProps } from '@uiw/react-md-editor';

import styles from './styles.module.scss';

interface Props extends MDEditorProps {
  label?: string;
}

const MarkdownEditor: React.FC<Props> = ({ label, preview, ...leftoverProps }) => {
  return (
    <ReactMarkdownEditor
      toolbarBottom={true}
      preview={preview ? preview : 'edit'}
      {...leftoverProps}
    />
  );
};

export default MarkdownEditor;
