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
  const recaptchaVerifier = useRef();
  const [isTimerEnd, setTimerEnd] = useState(false);
  const [seconds, setSeconds] = useState(TIMER_LENGTH);
  const [values, setValue] = useState(['', '', '', '', '', '']);
  const [refs, setRef] = useState([null, null, null, null, null, null]);
  const refValue1 = useRef();
  const refValue2 = useRef();
  const refValue3 = useRef();
  const refValue4 = useRef();
  const refValue5 = useRef();
  const refValue6 = useRef();
  const [verificationId, setVerificationId] = useState(null);

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
    setValue(['', '', '', '', '', '']);
  };

  const resendCode = async (): void => {
    const phoneProvider = new firebaseService.auth.PhoneAuthProvider();
    const id = await phoneProvider.verifyPhoneNumber(
      phone,
      recaptchaVerifier.current,
    );
    setVerificationId(id);
    resetCode();
    startTimer();
  };

  const verifyCode = (code): void => {
    console.log('verification', verificationId, code);
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
    setRef([refValue1, refValue2, refValue3, refValue4, refValue5, refValue6]);
    const id = startTimer();
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (!route.params || !route.params.verificationId) return;
    setVerificationId(route.params.verificationId);
  }, [route.params]);

  const setLastNumber = (value): void => {
    const code = `${values[0]}${values[1]}${values[2]}${values[3]}${values[4]}${value}`;
    verifyCode(code);
  };

  const setCodeValue = (number, value) => {
    const code = [...values];
    code[number] = value;
    setValue(code);
    if (+number > 4) {
      setLastNumber(value);
      return;
    }
    // console.log('refs[number + 1]', refs[number + 1].current.focus());
    refs[number + 1] && refs[number + 1].current.focus();
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
          ref={refValue1}
          value={values[0]}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          textAlign="center"
          onChangeText={value => setCodeValue(0, value)}
          maxLength={1}
        />
        <InputNumber
          ref={refValue2}
          value={values[1]}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={value => setCodeValue(1, value)}
          maxLength={1}
        />
        <InputNumber
          ref={refValue3}
          value={values[2]}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={value => setCodeValue(2, value)}
          maxLength={1}
        />
        <InputNumber
          ref={refValue4}
          value={values[3]}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={value => setCodeValue(3, value)}
          maxLength={1}
        />
        <InputNumber
          ref={refValue5}
          value={values[4]}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={value => setCodeValue(4, value)}
          maxLength={1}
        />
        <InputNumber
          ref={refValue6}
          value={values[5]}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChangeText={value => setCodeValue(5, value)}
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
