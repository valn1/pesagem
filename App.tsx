import React from 'react';
import { ThemeProvider } from './src/hooks/theme';
import { Home } from './src/screens/Home';
import { db } from './src/helpers/database';

function App(): React.JSX.Element {
  db.init();
  return (
    <ThemeProvider>
      <Home />
    </ThemeProvider>
  );
}

export default App;
