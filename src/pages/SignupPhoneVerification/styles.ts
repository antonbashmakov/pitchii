import styled from 'styled-components/native';

export const ViewContainer = styled.View`
  flex: 1;
  padding-top: 32px;
  padding-horizontal: 32px;
  background-color: white;
`;

export const Label = styled.Text`
  font-size: 24px;
  margin-bottom: 8px;
`;

export const ShortDescription = styled.Text`
  font-size: 14px;
`;

export const InputCodeContainer = styled.View`
  margin-vertical: 24px;
  justify-content: space-between;
  flex-direction: row;
`;

export const InputNumber = styled.TextInput`
  width: 32px;
  font-size: 32px;
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: grey;
`;

export const TimerText = styled.TextInput`
  font-size: 16px;
`;

export const ResendCode = styled.TouchableOpacity``;

export const ResentCodeText = styled.Text`
  color: red;
`;
