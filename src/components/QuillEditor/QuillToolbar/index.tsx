import React, { RefObject } from 'react';
import ReactQuill from 'react-quill';

import {

} from '@material-ui/core';

import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';

import RoundedButton from '../../RoundedButton';

import styles from './QuillToolbar.module.scss';

interface Props {
  editorRef: RefObject<ReactQuill>;
}

const QuillToolbar: React.FC<Props> = ({ editorRef }) => {
  return (
    <div className={styles.toolbar}>
      {/* <select className='ql-header' defaultValue={''} onChange={e => e.persist()}>
        <option value='1' />
        <option value='2' />
        <option selected />
      </select>
      <button className='ql-bold' />
      <button className='ql-italic' />
      <select className='ql-color'>
        <option value='red' />
        <option value='green' />
        <option value='blue' />
        <option value='orange' />
        <option value='violet' />
        <option value='#d0d1d2' />
        <option selected />
      </select> */}
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
