import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { Feather } from '@expo/vector-icons';
import { TextInputMaskProps } from 'react-native-masked-text';

import {
  InputContainer,
  InputLabel,
  InputContent,
  Input,
  Icon,
} from './styles';

interface InputMaskProps extends TextInputMaskProps {
  label: string;
  icon?: string;
}

interface InputMaskRef {
  focus(): void;
}

const InputMask: React.ForwardRefRenderFunction<
  InputMaskRef,
  InputMaskProps
> = ({ label, icon, ...rest }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputElementRef = useRef<any>(null);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <InputContent>
        <Input
          {...rest}
          ref={inputElementRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {icon && (
          <Icon>
            <Feather
              name={icon}
              color={isFocused ? '#1163ad' : '#c4c4c4'}
              size={22}
            />
          </Icon>
        )}
      </InputContent>
    </InputContainer>
  );
};

export default forwardRef(InputMask);
