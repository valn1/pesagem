import React from 'react';
import { ThemeProvider } from './src/hooks/theme';
import { Home } from './src/screens/Home';

function App(): React.JSX.Element {
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App;
