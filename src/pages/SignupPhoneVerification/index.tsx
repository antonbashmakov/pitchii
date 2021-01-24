import React, { useEffect, useState } from 'react';

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

const SignupPhoneVerification: React.FC = ({ route }) => {
  const { phone } = route.params;
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
    const id = setInterval(() => setSeconds(s--), 1000);
    setTimeout(() => {
      clearInterval(id);
      setTimerEnd(true);
    }, TIMER_LENGTH * 1000);
    return id;
  };

  const resendCode = (): void => {
    // TODO resend
    setValue1('');
    setValue2('');
    setValue3('');
    setValue4('');
    setValue5('');
    setValue6('');
    startTimer();
  };

  useEffect(() => {
    const id = startTimer();
    return () => clearInterval(id);
  }, []);

  return (
    <ViewContainer>
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
          onChange={value => setValue1(value)}
          maxLength={1}
        />
        <InputNumber
          value={value2}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChange={value => setValue2(value)}
          maxLength={1}
        />
        <InputNumber
          value={value3}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChange={value => setValue3(value)}
          maxLength={1}
        />
        <InputNumber
          value={value4}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChange={value => setValue4(value)}
          maxLength={1}
        />
        <InputNumber
          value={value5}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChange={value => setValue5(value)}
          maxLength={1}
        />
        <InputNumber
          value={value6}
          textAlign="center"
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          onChange={value => setValue6(value)}
          maxLength={1}
        />
      </InputCodeContainer>
      {!isTimerEnd ? (
        <TimerText>Resend code in {seconds} seconds</TimerText>
      ) : (
        <ResendCode onPress={() => resendCode()}>
          <ResentCodeText>Resend code</ResentCodeText>
        </ResendCode>
      )}
    </ViewContainer>
  );
};

export default SignupPhoneVerification;
