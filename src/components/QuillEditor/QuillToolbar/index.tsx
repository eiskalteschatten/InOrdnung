import React, { RefObject } from 'react';
import ReactQuill from 'react-quill';

import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';

import RoundedButton from '../../RoundedButton';

import styles from './QuillToolbar.module.scss';

interface Props {
  editorRef: RefObject<ReactQuill>;
}

const ToolbarDivider: React.FC = () => (<div className={styles.divider} />);

const QuillToolbar: React.FC<Props> = ({ editorRef }) => {
  return (
    <div className={styles.toolbar}>
      {/*
      <select className='ql-color'>
        <option value='red' />
        <option value='green' />
        <option value='blue' />
        <option value='orange' />
        <option value='violet' />
        <option value='#d0d1d2' />
        <option selected />
      </select> */}
      <select
        id='columnId'
        // value={context.editColumnId}
        onChange={() => console.log('fdsfds')}
        className={styles.select}
      >
        <option selected>Body</option>
        <option value='1'>Header 1</option>
        <option value='2'>Header 2</option>
      </select>

      <ToolbarDivider />

      <RoundedButton
        onClick={() => console.log('fjdks')}
        size='small'
      >
        <FormatBold fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => console.log('fjdks')}
        size='small'
      >
        <FormatItalic fontSize='small' />
      </RoundedButton>
    </div>
  );
};

export default QuillToolbar;
