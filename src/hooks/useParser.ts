import { Fragment, ReactElement, createElement } from 'react';
import rehypeHighlight from 'rehype-highlight';
import rehypeMinifyWhitespace from 'rehype-minify-whitespace';
import rehypeParse from 'rehype-parse';
import rehypeRaw from 'rehype-raw';
import rehypeReact from 'rehype-react';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';

const parse = async (markdown: string, css: string = '') => {
  const minifiedCss = css.split('\n').join('');

  const linkDict = {
    highlightjs: `<link rel="stylesheet" href="https://unpkg.com/@highlightjs/cdn-assets@11.7.0/styles/atom-one-dark.min.css">`,
    sanitize: `<link rel="stylesheet" href="https://unpkg.com/sanitize.css"/>`,
  } as const;
  const links = Object.values(linkDict).join('');

  return await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeMinifyWhitespace)
    .use(rehypeStringify)
    .process(`${links}<style>${minifiedCss}</style>\n\n${markdown}`)
    .then(({ value: html }) => {
      if (typeof html === 'string') {
        return html;
      }
      throw new Error('value is not string');
    });
};

export const useParser = (
  markdown: string,
  css: string,
  displayError: () => void,
  hideError: () => void
) => {
  const [html, setHtml] = useState('');
  const [element, setElement] = useState<ReactElement>(createElement(Fragment));

  useEffect(() => {
    (async () => {
      const parsed = await parse(markdown, css);
      setHtml(parsed);

      unified()
        .use(rehypeParse, { fragment: true })
        .use(rehypeReact, { createElement, Fragment })
        .process(parsed)
        .then((file) => {
          setElement(file.result);
          hideError();
        });
    })().catch(() => displayError());
  }, [markdown, css]);

  return { element, html };
};
