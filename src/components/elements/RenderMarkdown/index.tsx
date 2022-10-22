import React, { useMemo } from 'react';
import { PluggableList } from 'unified';
import ReactMarkdown from 'react-markdown';
import strip from 'strip-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
  markdownString: string | undefined;
  stripMarkdown?: boolean;
}

const RenderMarkdown: React.FC<Props> = ({ markdownString, stripMarkdown }) => {
  const remarkPlugins = useMemo(() => {
    const plugins: PluggableList = [
      remarkGfm,
    ];

    if (stripMarkdown) {
      plugins.push(strip);
    }

    return plugins;
  }, [stripMarkdown]);

  if (!markdownString) {
    return null;
  }

  return (
    <ReactMarkdown
      skipHtml
      remarkPlugins={remarkPlugins}
    >
      {markdownString}
    </ReactMarkdown>
  );
};

export default RenderMarkdown;
