import root from 'react-shadow';

export const Index = () => {
  const modes = {
    md: 'Markdown',
    css: 'CSS',
  } as const;
  const { currentMode, nextMode, toggleMode } = useMode(modes);
  const { cssInput, setCssInput, resetToDefault } = useCssInput();
  const { markdownInput, setMarkdownInput } = useMarkdownInput('# ');
  const inputValue = currentMode === 'md' ? markdownInput : cssInput;
  const handleInputChange =
    currentMode === 'md'
      ? (e: any) => setMarkdownInput(e.target.value)
      : (e: any) => setCssInput(e.target.value);

  const [errorOccurred, setErrorOccurred] = useState(false);
  const { element: output, html } = useParser(
    markdownInput,
    cssInput,
    () => setErrorOccurred(true),
    () => setErrorOccurred(false)
  );

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const {
    handleScroll1: handleInputScroll,
    handleScroll2: handleOutputScroll,
  } = useSyncScroll(inputRef, outputRef);

  const handleToggleMode = () => {
    toggleMode();
    inputRef.current?.scrollTo({ top: 0 });
  };

  const [showFooter, setShowFooter] = useState(false);

  const [isCopied, setIsCopied] = useState(false);
  const handleClickCopy = () => {
    copyToClipboard(intoShadowDom(html));
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 500);
  };

  const handleClickExport = () => {
    const today = new Date();
    const outputFilename = `${hyphenateDate(today)}.md`;
    exportAs(markdownInput, outputFilename);
  };

  return (
    <Screen>
      <Header>
        <HeaderText>markdown editor</HeaderText>
        <ButtonGroup>
          <ButtonWrapper>
            <button onClick={handleClickCopy}>Copy HTML</button>
            {isCopied && <Bubble position="bottom">Copied!</Bubble>}
          </ButtonWrapper>
          <button onClick={handleClickExport}>Export</button>
        </ButtonGroup>
      </Header>
      <Wrapper>
        <InputWrapper>
          <InputTextarea
            ref={inputRef}
            value={inputValue}
            onChange={handleInputChange}
            onScroll={currentMode === 'md' ? handleInputScroll : undefined}
          />
          {showFooter && (
            <InputFooter>
              {currentMode === 'css' && (
                <FooterButton onClick={resetToDefault}>Reset</FooterButton>
              )}
              <FooterButton onClick={handleToggleMode}>
                Edit {modes[nextMode as keyof typeof modes]}
              </FooterButton>
            </InputFooter>
          )}
          {errorOccurred && (
            <ErrorSnackbar onClick={() => setErrorOccurred(false)}>
              Error occurred. Check your syntax.
            </ErrorSnackbar>
          )}
          <FooterToggleButton onClick={() => setShowFooter((cur) => !cur)}>
            {showFooter ? '∨' : '∧'}
          </FooterToggleButton>
        </InputWrapper>
        <OutputArea
          ref={outputRef}
          onScroll={currentMode === 'md' ? handleOutputScroll : undefined}
        >
          <root.div className="article-root">{output}</root.div>
        </OutputArea>
      </Wrapper>
    </Screen>
  );
};

const Screen = styled.div({
  position: 'relative',
  display: 'flex',
  height: '100vh',
  width: '100vw',
  flexDirection: 'column',
});

const Header = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px 24px',
});

const HeaderText = styled.h2({
  margin: 0,
});

const ButtonGroup = styled.div({
  position: 'relative',
  display: 'flex',
  gap: 8,
});

const ButtonWrapper = styled.div({
  position: 'relative',
});

const Wrapper = styled.div({
  display: 'flex',
  flex: 1,
  overflow: 'hidden',
});

const Pane = styled.div({
  display: 'flex',
  flexDirection: 'column',
  width: '50%',
});

const InputWrapper = styled(Pane)({
  position: 'relative',
  backgroundColor: '#242424',
});

const InputTextarea = styled.textarea({
  flex: 1,
  padding: 24,
  backgroundColor: 'transparent',
  color: 'white',
  justifyContent: 'stretch',
  outline: 'none',
  border: 'none',
  resize: 'none',
});

const FooterToggleButton = styled.button({
  position: 'absolute',
  width: 32,
  height: 32,
  bottom: 8,
  left: 16,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: 'none',
  borderRadius: 16,
  backgroundColor: 'rgba(256, 256, 256, 0.5)',
  fontWeight: 600,
  fontSize: 12,
  opacity: 0.3,
  transition: '0.1s',

  ':hover': {
    opacity: 1,
  },
});

const InputFooter = styled.div({
  display: 'flex',
  padding: '8px 24px',
  justifyContent: 'right',
  gap: 8,
});

const FooterButton = styled.button({
  padding: '4px 8px',
  background: 'none',
  color: 'orange',
});

const OutputArea = styled(Pane)({
  padding: '0 24px 24px 24px',
  overflow: 'scroll',
});
