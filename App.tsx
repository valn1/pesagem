import React from 'react';
import { ThemeProvider } from './src/hooks/theme';
import { db } from './src/helpers/database';
import { Navigation } from './src/router';

function App(): React.JSX.Element {
  db.init();
  return (
    <ThemeProvider>
      <Navigation />
    </ThemeProvider>
  );
}

export default App;
