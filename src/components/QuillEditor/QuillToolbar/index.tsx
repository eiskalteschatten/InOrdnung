import React, { RefObject } from 'react';
import ReactQuill from 'react-quill';

import FormatBold from '@material-ui/icons/FormatBold';
import FormatItalic from '@material-ui/icons/FormatItalic';
import FormatUnderlined from '@material-ui/icons/FormatUnderlined';
import FormatStrikethrough from '@material-ui/icons/FormatStrikethrough';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenter from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRight from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustify from '@material-ui/icons/FormatAlignJustify';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import FormatListNumbered from '@material-ui/icons/FormatListNumbered';
import Code from '@material-ui/icons/Code';
import Quote from '@material-ui/icons/FormatQuote';

import RoundedButton from '../../RoundedButton';

import styles from './QuillToolbar.module.scss';

interface Props {
  editorRef: RefObject<ReactQuill>;
}

const ToolbarDivider: React.FC = () => (<div className={styles.divider} />);

const QuillToolbar: React.FC<Props> = ({ editorRef }) => {
  const handleFormatChange = (format: string): void => {
    // editorRef.current.quill.format(format, true);
  };

  return (
    <div className={styles.toolbar}>
      <select
        id='columnId'
        // value={context.editColumnId}
        onChange={() => console.log('fdsfds')}
        className={styles.select}
      >
        <option selected>Body</option>
        <option value='1'>Header 1</option>
        <option value='2'>Header 2</option>
        <option value='3'>Header 3</option>
        <option value='4'>Header 4</option>
        <option value='5'>Header 5</option>
        <option value='6'>Header 6</option>
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
      <RoundedButton
        onClick={() => console.log('fjdks')}
        size='small'
      >
        <FormatUnderlined fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => console.log('fjdks')}
        size='small'
      >
        <FormatStrikethrough fontSize='small' />
      </RoundedButton>

      <ToolbarDivider />

      <RoundedButton
        onClick={() => console.log('fjdks')}
        size='small'
      >
        <FormatAlignLeft fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => console.log('fjdks')}
        size='small'
      >
        <FormatAlignCenter fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => console.log('fjdks')}
        size='small'
      >
        <FormatAlignRight fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => console.log('fjdks')}
        size='small'
      >
        <FormatAlignJustify fontSize='small' />
      </RoundedButton>

      <ToolbarDivider />

      <RoundedButton
        onClick={() => console.log('fjdks')}
        size='small'
      >
        <FormatListBulleted fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => console.log('fjdks')}
        size='small'
      >
        <FormatListNumbered fontSize='small' />
      </RoundedButton>

      <ToolbarDivider />

      <RoundedButton
        onClick={() => console.log('fjdks')}
        size='small'
      >
        <Code fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => console.log('fjdks')}
        size='small'
      >
        <Quote fontSize='small' />
      </RoundedButton>
    </div>
  );
};

export default QuillToolbar;
