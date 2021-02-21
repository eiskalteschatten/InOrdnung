import React, { useRef } from 'react';
import { Delta, Sources } from 'quill';
import ReactQuill from 'react-quill';
import clsx from 'clsx';

import QuillToolbar from './QuillToolbar';

import '../../scss/quill.scss';
import styles from './QuillEditor.module.scss';

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'color',
];

interface Props {
  value: string;
  onChange: (content: string, delta: Delta, source: Sources, editor: any) => void;
  placeholder?: string;
  className?: string;
}

const QuillEditor: React.FC<Props> = ({ value, onChange, placeholder, className }) => {
  const editorRef = useRef<ReactQuill>(null);

  return (
    <div className={clsx(styles.container, className)}>
      <QuillToolbar editorRef={editorRef} />
      <ReactQuill
        ref={editorRef}
        value={value}
        onChange={onChange}
        theme='bubble'
        placeholder={placeholder}
        formats={formats}
        modules={{
          clipboard: {
            matchVisual: false,
          },
        }}
      />
    </div>
  );
};

export default QuillEditor;
