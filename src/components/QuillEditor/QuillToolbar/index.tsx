import React, { RefObject, useEffect, useReducer, useState } from 'react';
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

type Format = boolean | string | number;

interface State {
  [format: string]: Format;
}

interface Action {
  type: string;
  value?: Format;
}

const initialState = {};

const reducer = (state: State, action: Action): State => {
  return action.type === 'initialState' ? initialState : {
    ...state,
    [action.type]: action.value ? action.value : !state[action.type],
  };
};

interface Props {
  editorRef: RefObject<ReactQuill>;
}

const ToolbarDivider: React.FC = () => (<div className={styles.divider} />);

const QuillToolbar: React.FC<Props> = ({ editorRef }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [header, setHeader] = useState<Format>();

  useEffect(() => {
    const editor = editorRef.current?.getEditor();

    const updateFormats = () => {
      const format = editor?.getFormat();
      if (format) {
        dispatch({ type: 'initialState' });

        for (const [type, value] of Object.entries(format)) {
          dispatch({ type, value });
        }
      }
    };

    editor?.on('selection-change', updateFormats);

    return () => {
      editor?.off('selection-change', updateFormats);
    };
  }, [editorRef]);

  useEffect(() => {
    const editor = editorRef.current?.getEditor();

    for (const [format, value] of Object.entries(state)) {
      editor?.format(format, value);
    }

    setHeader(state.header || '');
  }, [state]);

  const handleHeaderChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    dispatch({ type: 'header', value: e.target.value });
  };

  return (
    <div className={styles.toolbar}>
      <select
        id='columnId'
        value={header as string}
        onChange={handleHeaderChange}
        className={styles.select}
      >
        <option value='' selected>Body</option>
        <option value='1'>Header 1</option>
        <option value='2'>Header 2</option>
        <option value='3'>Header 3</option>
        <option value='4'>Header 4</option>
        <option value='5'>Header 5</option>
        <option value='6'>Header 6</option>
      </select>

      <ToolbarDivider />

      <RoundedButton
        onClick={() => dispatch({ type: 'bold' })}
        size='small'
        selected={Boolean(state.bold)}
      >
        <FormatBold fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => dispatch({ type: 'italic' })}
        size='small'
        selected={Boolean(state.italic)}
      >
        <FormatItalic fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => dispatch({ type: 'underline' })}
        size='small'
        selected={Boolean(state.underline)}
      >
        <FormatUnderlined fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => dispatch({ type: 'strike' })}
        size='small'
        selected={Boolean(state.strike)}
      >
        <FormatStrikethrough fontSize='small' />
      </RoundedButton>

      <ToolbarDivider />

      <RoundedButton
        onClick={() => dispatch({ type: 'align', value: '' })}
        size='small'
        selected={!state.align || state.align === ''}
      >
        <FormatAlignLeft fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => dispatch({ type: 'align', value: 'center' })}
        size='small'
        selected={state.align === 'center'}
      >
        <FormatAlignCenter fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => dispatch({ type: 'align', value: 'right' })}
        size='small'
        selected={state.align === 'right'}
      >
        <FormatAlignRight fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => dispatch({ type: 'align', value: 'justify' })}
        size='small'
        selected={state.align === 'justify'}
      >
        <FormatAlignJustify fontSize='small' />
      </RoundedButton>

      <ToolbarDivider />

      <RoundedButton
        onClick={() => dispatch({ type: 'list', value: 'bullet' })}
        size='small'
        selected={state.list === 'bullet'}
      >
        <FormatListBulleted fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => dispatch({ type: 'list', value: 'ordered' })}
        size='small'
        selected={state.list === 'ordered'}
      >
        <FormatListNumbered fontSize='small' />
      </RoundedButton>

      <ToolbarDivider />

      <RoundedButton
        onClick={() => dispatch({ type: 'code-block' })}
        size='small'
        selected={Boolean(state['code-block'])}
      >
        <Code fontSize='small' />
      </RoundedButton>
      <RoundedButton
        onClick={() => dispatch({ type: 'blockquote' })}
        size='small'
        selected={Boolean(state.blockquote)}
      >
        <Quote fontSize='small' />
      </RoundedButton>
    </div>
  );
};

export default QuillToolbar;
