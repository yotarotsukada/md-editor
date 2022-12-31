import defaultCss from '../assets/custom.css?raw';

export const useMarkdownInput = (init: string = '') => {
  const saved = window.sessionStorage.getItem('markdown');
  const [markdown, setMarkdown] = useState(saved ?? init);
  const setMarkdownInput = (text: string) => {
    setMarkdown(text);
    window.sessionStorage.setItem('markdown', text);
  };
  return { markdownInput: markdown, setMarkdownInput };
};

export const useCssInput = () => {
  const saved = window.localStorage.getItem('css');
  const [css, setCss] = useState(saved !== null ? saved : defaultCss);

  const setCssInput = (text: string) => {
    setCss(text);
    window.localStorage.setItem('css', text);
  };

  const resetToDefault = () => {
    setCss(defaultCss);
    window.localStorage.removeItem('css');
  };
  return { cssInput: css, setCssInput, resetToDefault };
};
