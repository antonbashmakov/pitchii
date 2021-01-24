import styled from 'styled-components/native';

export const ViewContainer = styled.View`
  flex: 1;
  padding-top: 48px;
  background-color: white;
`;

export const InputContainer = styled.View`
  padding-horizontal: 24px;
  flex-direction: column;
  align-items: center;
`;

export const SendCodeButton = styled.TouchableOpacity`
  width: 100%;
  margin-top: 24px;
  background-color: grey;
  height: 48px;
  justify-content: center;
  align-items: center;
`;

export const SendCodeText = styled.Text`
  color: white;
  font-size: 14px;
`;
