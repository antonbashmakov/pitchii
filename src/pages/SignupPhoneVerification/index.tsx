import React, { useEffect, useRef, useState } from 'react';

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';

import firebaseService from '../../service/firebaseService';

import {
  ViewContainer,
  Label,
  ShortDescription,
  InputCodeContainer,
  InputNumber,
  TimerText,
  ResendCode,
  ResentCodeText,
} from './styles';

const TIMER_LENGTH = 60;

const SignupPhoneVerification: React.FC = ({ route, navigation }) => {
  const { phone } = route.params;
  let { verificationId } = route.params;
  const recaptchaVerifier = useRef();
  const [isTimerEnd, setTimerEnd] = useState(false);
  const [seconds, setSeconds] = useState(TIMER_LENGTH);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [value3, setValue3] = useState('');
  const [value4, setValue4] = useState('');
  const [value5, setValue5] = useState('');
  const [value6, setValue6] = useState('');

  const startTimer = (): NodeJS.Timeout => {
    setTimerEnd(false);
    let s = TIMER_LENGTH;
    // eslint-disable-next-line no-plusplus
    const id = setInterval(() => setSeconds(s--), 1000);
    setTimeout(() => {
      clearInterval(id);
      setTimerEnd(true);
    }, TIMER_LENGTH * 1000);
    return id;
  };

  const resetCode = (): void => {
    setValue1('');
    setValue2('');
    setValue3('');
    setValue4('');
    setValue5('');
    setValue6('');
  };

  const resendCode = async (): void => {
    const phoneProvider = new firebaseService.auth.PhoneAuthProvider();
    verificationId = await phoneProvider.verifyPhoneNumber(
      phone,
      recaptchaVerifier.current,
    );
    resetCode();
    startTimer();
  };

  const verifyCode = (code): void => {
    console.log('verification', verificationId, code, value1);
    const credential = firebaseService.auth.PhoneAuthProvider.credential(
      verificationId,
      code,
    );
    firebaseService
      .auth()
      .signInWithCredential(credential)
      .then(() => navigation.navigate('Main'))
      .catch(e => {
        console.log('verifyCodeFailed', e);
        resetCode();
        setTimerEnd(true);
      });
  };

  useEffect(() => {
    const id = startTimer();
    return () => clearInterval(id);
  }, []);

  const setLastNumber = (value): void => {
    setValue6(value);
    const code = `${value1}${value2}${value3}${value4}${value5}${value}`;
    verifyCode(code);
  };

  return (
    <ViewContainer>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseService.config()}
        attemptInvisibleVerification
      />
      <Label>Enter 6-digit code</Label>
      <ShortDescription>
        Your code was send to
        {phone}
      </ShortDescription>
      <InputCodeContainer>
        <InputNumber
          value={value1}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          textAlign="center"
          onChangeText={value => setValue1(value)}
          maxLength={1}
        />
        <InputNumber
          value={value2}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={value => setValue2(value)}
          maxLength={1}
        />
        <InputNumber
          value={value3}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={value => setValue3(value)}
          maxLength={1}
        />
        <InputNumber
          value={value4}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={value => setValue4(value)}
          maxLength={1}
        />
        <InputNumber
          value={value5}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={value => setValue5(value)}
          maxLength={1}
        />
        <InputNumber
          value={value6}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={value => setLastNumber(value)}
          maxLength={1}
        />
      </InputCodeContainer>
      {!isTimerEnd ? (
        <TimerText>{`Resend code in ${seconds} seconds`}</TimerText>
      ) : (
        <ResendCode onPress={() => resendCode()}>
          <ResentCodeText>Resend code</ResentCodeText>
        </ResendCode>
      )}
    </ViewContainer>
  );
};

export default SignupPhoneVerification;
