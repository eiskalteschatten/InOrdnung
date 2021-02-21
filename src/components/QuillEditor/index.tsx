import React from 'react';
import { Delta, Sources } from 'quill';
import ReactQuill from 'react-quill';

import QuillToolbar from './QuillToolbar';

import '../../scss/quill.scss';
// import styles from './QuillEditor.module.scss';

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
  return (
    <>
      <QuillToolbar />
      <ReactQuill
        value={value}
        onChange={onChange}
        theme='bubble'
        placeholder={placeholder}
        className={className}
        formats={formats}
        modules={{
          toolbar: {
            container: '#toolbar',
          },
          clipboard: {
            matchVisual: false,
          },
        }}
      />
    </>
  );
};

export default QuillEditor;
