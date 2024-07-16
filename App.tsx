import React from 'react';
import { ThemeProvider } from './src/hooks/theme';
import { db } from './src/helpers/database';
import { Navigation } from './src/router';
import { AuthenticationProvider } from './src/hooks/autentication';
import { ConfigsProvider } from './src/hooks/configs';

function App(): React.JSX.Element {
  db.init();//todo: esperar o banco estar ok para iniciar o app
  return (
    <ConfigsProvider>
      <ThemeProvider>
        <AuthenticationProvider>
          <Navigation />
        </AuthenticationProvider>
      </ThemeProvider>
    </ConfigsProvider>
  );
}

export default App;
