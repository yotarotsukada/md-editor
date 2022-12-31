const slideIn = keyframes`
  0% {
    opacity: 0;
    bottom: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const ErrorSnackbar = styled.div({
  borderRadius: 4,
  backgroundColor: 'rgba(256, 256, 256, 0.85)',
  color: '#c61a09',
  padding: '8px 24px',
  position: 'absolute',
  bottom: 48,
  left: 16,
  cursor: 'pointer',
  animation: `${slideIn} 0.3s ease-out both`,
  transition: 'all 0.5s 0s ease',
});
