import React from 'react';
import { ThemeProvider } from './src/hooks/theme';
import { db } from './src/helpers/database';
import { Navigation } from './src/router';
import { AuthenticationProvider } from './src/hooks/autentication';
import { ConfigsProvider } from './src/hooks/configs';
import combineProviders from './providerAccumulator';
import { hide } from 'react-native-bootsplash';

const AllProviders = combineProviders(
  ConfigsProvider,
  ThemeProvider,
  AuthenticationProvider
);

function App(): React.JSX.Element {

  db.init().then(() => hide({ fade: true }));
  return (
    <AllProviders>
      <Navigation />
    </AllProviders>
  );
}

export default App;
