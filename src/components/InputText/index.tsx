import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  InputContainer,
  InputLabel,
  InputContent,
  Input,
  Icon,
} from './styles';

interface InputTextProps extends TextInputProps {
  label: string;
  icon?: string;
}

interface InputTextRef {
  focus(): void;
}

const InputText: React.ForwardRefRenderFunction<
  InputTextRef,
  InputTextProps
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

export default forwardRef(InputText);
