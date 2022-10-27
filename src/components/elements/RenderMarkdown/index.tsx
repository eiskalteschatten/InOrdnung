import React, { useEffect, useMemo, useState } from 'react';
import { PluggableList } from 'unified';
import { remark } from 'remark';
import ReactMarkdown from 'react-markdown';
import strip from 'strip-markdown';
import remarkGfm from 'remark-gfm';

type MarkdownString = string | undefined;

interface Props {
  markdownString: MarkdownString;
  stripMarkdown?: boolean;
}

const RenderMarkdown: React.FC<Props> = ({ markdownString, stripMarkdown }) => {
  const [_markdownString, setMarkdownString] = useState<MarkdownString>();

  const remarkPlugins = useMemo(() => {
    const plugins: PluggableList = [
      remarkGfm,
    ];

    return plugins;
  }, []);

  useEffect(() => {
    if (!stripMarkdown || !markdownString) {
      setMarkdownString(markdownString);
      return;
    }

    remark()
      .use(strip)
      .process(markdownString)
      .then(file => setMarkdownString(String(file)))
      .catch(console.error);
  }, [markdownString, stripMarkdown]);

  if (!_markdownString) {
    return null;
  }

  if (stripMarkdown) {
    return (
      <>{_markdownString}</>
    );
  }

  return (
    <ReactMarkdown
      skipHtml
      remarkPlugins={remarkPlugins}
    >
      {_markdownString}
    </ReactMarkdown>
  );
};

export default RenderMarkdown;
