import React from 'react';
import { SafeAreaView } from 'react-native';
import VSText from './src/components/VSText';
import VSButton from './src/components/VSButton';
import VSIcon from './src/components/VSIcon';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <VSText bold size={40}>demonstração dos componentes</VSText>
      <VSText italic size={35} color='green' args={['laranja', 'pera', 'uva']}>{'frutas: {{0}}, {{1}}, {{2}}'}</VSText>
      <VSText underline size={30} color='yellow'>
        testando
        <VSText strikeThrough size={25} color='turquoise' args={['um', 'dois', 'três']}>{'(testando {{0}}, {{1}}, {{2}})'}</VSText>
        <VSText size={25} color='purple' args={['funciona mesmo bixo']}>{'\num texto qualquer {{0}}'}</VSText>
      </VSText>
      <VSButton onPress={() => console.log('Test')} />
      <VSIcon name='biohazard' color='red' size={50} />
      <VSIcon name='circle-radiation' color='yellow' size={50} />
      <VSIcon name='person-circle-xmark' color='red' size={50} />
      <VSIcon name='person-military-rifle' color='red' size={50} />
      <VSIcon name='crossbones' color='red' size={50} />
      <VSIcon name='atom' color='red' size={20} />
    </SafeAreaView>
  );
}

export default App;
