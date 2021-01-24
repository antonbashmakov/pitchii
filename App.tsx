import React, { useEffect } from 'react';
import { Clipboard } from 'react-native';

import Routes from './src/routes';
import firebaseService from './src/service/firebaseService';

// HACK: Prevent "Expo pasted from CoreSimulator" notification from spamming continuously
if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  Clipboard.setString('');
}

const App: React.FC = () => {
  useEffect(() => {
    firebaseService.run();
  }, []);
  return <Routes />;
};

export default App;
