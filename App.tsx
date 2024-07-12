import React from 'react';
import { ThemeProvider } from './src/hooks/theme';
import { db } from './src/helpers/database';
import { Navigation } from './src/router';
import { AuthenticationProvider } from './src/hooks/autentication';

function App(): React.JSX.Element {
  db.init();
  return (
    <ThemeProvider>
      <AuthenticationProvider>
        <Navigation />
      </AuthenticationProvider>
    </ThemeProvider>
  );
}

export default App;
