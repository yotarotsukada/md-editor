export const intoShadowDom = (html: string) => {
  const sanitized = html.replaceAll('`', '\\`');

  const root = 'article-root';
  const script = `
const div = document.getElementById('${root}');
const shadowRoot = div.attachShadow({ mode: 'open' });
shadowRoot.innerHTML = \`${sanitized}\`;`;

  return `<div id="${root}"></div><script>${script}</script>`;
};
