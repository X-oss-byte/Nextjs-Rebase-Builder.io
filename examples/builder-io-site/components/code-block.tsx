import React from 'react';
import { LightAsync as SyntaxHighlighter } from 'react-syntax-highlighter';
import javascript from 'react-syntax-highlighter/dist/cjs/languages/hljs/javascript';
import html from 'react-syntax-highlighter/dist/cjs/languages/hljs/xml';
import githubGist from 'react-syntax-highlighter/dist/cjs/styles/hljs/github-gist';
import oneDark from 'react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark';
import { withBuilder } from '@builder.io/react';

SyntaxHighlighter.registerLanguage('html', html);
SyntaxHighlighter.registerLanguage('xml', html);
SyntaxHighlighter.registerLanguage('javascript', javascript);

// Adapted from https://github.com/dpeek/highlightjs-graphql/blob/master/graphql.js#L10
SyntaxHighlighter.registerLanguage('graphql', (hljs: any) => {
  return {
    aliases: ['gql'],
    keywords: {
      keyword: 'query mutation subscription|10 type interface union scalar fragment|10 enum on ...',
      literal: 'true false null',
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      hljs.QUOTE_STRING_MODE,
      hljs.NUMBER_MODE,
      {
        className: 'type',
        begin: '[^\\w][A-Z][a-z]',
        end: '\\W',
        excludeEnd: true,
      },
      {
        className: 'literal',
        begin: '[^\\w][A-Z][A-Z]',
        end: '\\W',
        excludeEnd: true,
      },
      { className: 'variable', begin: '\\$', end: '\\W', excludeEnd: true },
      {
        className: 'keyword',
        begin: '[.]{2}',
        end: '\\.',
      },
      {
        className: 'meta',
        begin: '@',
        end: '\\W',
        excludeEnd: true,
      },
    ],
    illegal: /([;<']|BEGIN)/,
  };
});

function CodeBlockComponent({ language, code, dark }: any /* TODO: types */) {
  return (
    <SyntaxHighlighter
      customStyle={{
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        lineHeight: '1em',
        fontSize: '1.2em',
        padding: '20px 0',
      }}
      style={dark ? oneDark : githubGist}
      language={language}
    >
      {code}
    </SyntaxHighlighter>
  );
}

export const CodeBlock = withBuilder(CodeBlockComponent, {
  name: 'Code Block',
  inputs: [
    {
      name: 'code',
      type: 'longText',
      defaultValue: 'const incr = num => num + 1',
    },
    {
      name: 'language',
      type: 'string',
      defaultValue: 'javascript',
    },
    {
      name: 'dark',
      type: 'boolean',
      defaultValue: false,
    },
  ],
});
