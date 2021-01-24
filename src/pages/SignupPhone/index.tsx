import React, { useRef, useState } from 'react';
import PhoneInput from 'react-native-phone-number-input';

import {
  ViewContainer,
  InputContainer,
  SendCodeButton,
  SendCodeText,
} from './styles';

const SignupPhone: React.FC = ({ navigation }) => {
  const [value, setValue] = useState();
  const [formattedValue, setFormattedValue] = useState();
  const phoneInput = useRef<PhoneInput>(null);

  const sendCode = (): void => {
    // todo do send code
    console.log('value', value);
    console.log('formattedValue', formattedValue);
    navigation.navigate('SignupPhoneVerification', { phone: formattedValue });
  };

  return (
    <ViewContainer>
      <InputContainer>
        <PhoneInput
          ref={phoneInput}
          placeholder="Phone Number"
          defaultValue={value}
          defaultCode="BY"
          layout="second"
          onChangeText={text => {
            setValue(text);
          }}
          onChangeFormattedText={text => {
            setFormattedValue(text);
          }}
          textContainerStyle={{
            backgroundColor: 'white',
          }}
          containerStyle={{
            width: '100%',
            backgroundColor: 'white',
            borderBottomColor: 'grey',
            borderBottomWidth: 1,
          }}
          autoFocus
        />
        <SendCodeButton
          // disabled={!phoneInput.current.isValidNumber()}
          onPress={() => sendCode()}
        >
          <SendCodeText>Send code</SendCodeText>
        </SendCodeButton>
      </InputContainer>
    </ViewContainer>
  );
};

export default SignupPhone;
