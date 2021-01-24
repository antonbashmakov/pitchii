import React, { useRef, useState } from 'react';
import PhoneInput from 'react-native-phone-number-input';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

import firebaseService from '../../service/firebaseService';

import {
  ViewContainer,
  InputContainer,
  SendCodeButton,
  SendCodeText,
} from './styles';

const SignupPhone: React.FC = ({ navigation }) => {
  const recaptchaVerifier = useRef();
  const [value, setValue] = useState('333101425');
  const [formattedValue, setFormattedValue] = useState();
  const phoneInput = useRef<PhoneInput>(null);

  const sendCode = async (): Promise<void> => {
    try {
      console.log('formattedValue', formattedValue);
      const phoneProvider = new firebaseService.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        formattedValue,
        recaptchaVerifier.current,
      );
      // setVerificationId(verificationId);
      navigation.navigate('SignupPhoneVerification', {
        phone: formattedValue,
        verificationId,
      });
    } catch (e) {
      console.log('signInWithPhoneNumber', e);
    }
  };

  return (
    <ViewContainer>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseService.config()}
        attemptInvisibleVerification
      />
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
