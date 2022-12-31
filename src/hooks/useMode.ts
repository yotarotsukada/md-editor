export const useMode = (modes: Record<string, string>) => {
  type Mode = keyof typeof modes;

  const keys = Object.keys(modes);
  const [mode, setMode] = useState(keys[0]);

  const next = (mode: Mode) => {
    return keys[keys.indexOf(mode) + 1] ?? keys[0];
  };

  const toggleMode = () => {
    setMode((cur) => next(cur));
  };

  return { currentMode: mode, nextMode: next(mode), toggleMode };
};
