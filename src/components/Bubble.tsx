type Props = {
  children: string;
  position: 'top' | 'bottom';
};

export const Bubble = ({ children, position }: Props) => {
  return (
    <Wrapper position={position}>
      <Body>{children}</Body>
      {position === 'top' ? <TopTail /> : <BottomTail />}
    </Wrapper>
  );
};

const Wrapper = styled.div<{ position: 'top' | 'bottom' }>(
  {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  ({ position }) => ({
    top: position === 'top' ? -40 : 'calc(100% + 8px)',
  })
);

const Body = styled.div({
  display: 'flex',
  alignItems: 'center',
  height: 32,
  maxHeight: 32,
  borderRadius: 8,
  backgroundColor: '#333333',
  color: '#ffffff',
  padding: '4px 8px',
  fontSize: 12,
});

const TopTail = styled.div({
  position: 'absolute',
  top: '100%',
  left: 'calc(50% - 8px)',
  border: '8px solid transparent',
  borderTop: '8px solid #333333',
});

const BottomTail = styled.div({
  position: 'absolute',
  top: '-16px',
  left: 'calc(50% - 8px)',
  border: '8px solid transparent',
  borderBottom: '8px solid #333333',
});
