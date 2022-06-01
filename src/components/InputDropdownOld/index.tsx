import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TextInputProps,
  View,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  InputContainer,
  InputLabel,
  InputContent,
  Input,
  Icon,
  DropdownOptions,
  DropdownOption,
  DropdownOptionValue,
  DropdownOptionsEmptyText,
} from './styles';

const styles = StyleSheet.create({
  dropdownContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    zIndex: 99999,
  },
  dropdownModal: {
    bottom: 0,
    position: 'absolute',
    height: '80%',
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  dropdownIndicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 16,
  },
});

interface InputDropdownItemProps {
  label: string;
  value: number | string;
}

interface InputDropdownProps extends TextInputProps {
  label: string;
  data: InputDropdownItemProps[];
  onSelect?(selected: InputDropdownItemProps): void;
}

const { height } = Dimensions.get('window');

const InputDropdownOld: React.FC<InputDropdownProps> = ({
  label,
  data,
  onSelect,
  ...rest
}) => {
  const [selected, setSelected] = useState<InputDropdownItemProps>();
  const [animated, setAnimated] = useState({
    opacity: new Animated.Value(0),
    dropdownContainer: new Animated.Value(height),
    dropdownModal: new Animated.Value(height),
  });

  const openModal = useCallback(() => {
    Animated.sequence([
      Animated.timing(animated.dropdownContainer, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animated.opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(animated.dropdownModal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animated]);

  const closeModal = useCallback(() => {
    Animated.sequence([
      Animated.timing(animated.dropdownModal, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(animated.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(animated.dropdownContainer, {
        toValue: height,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [animated]);

  const handleOptionSelect = useCallback(
    (option: InputDropdownItemProps) => {
      closeModal();
      setSelected(option);
      onSelect && onSelect(option);
    },
    [onSelect, closeModal],
  );

  const handleOptionPress = useCallback(() => {
    openModal();
  }, [openModal]);

  return (
    <>
      <InputContainer>
        <InputLabel>{label}</InputLabel>
        <InputContent onPress={handleOptionPress}>
          <Input
            {...rest}
            editable={false}
            placeholder="Selecione"
            value={selected?.label}
          />
          <Icon>
            <Feather name="chevron-down" color="#c4c4c4" size={24} />
          </Icon>
        </InputContent>
      </InputContainer>

      <Animated.View
        style={[
          styles.dropdownContainer,
          {
            opacity: animated.opacity,
            transform: [{ translateY: animated.dropdownContainer }],
          },
        ]}
      >
        <Animated.View
          style={[
            styles.dropdownModal,
            {
              transform: [{ translateY: animated.dropdownModal }],
            },
          ]}
        >
          <View style={styles.dropdownIndicator} onTouchMove={closeModal} />

          {data.length > 0 ? (
            <DropdownOptions
              nestedScrollEnabled
              onTouchMove={(e) => e.stopPropagation()}
            >
              {data.map((option) => (
                <DropdownOption
                  key={option.value}
                  onPress={() => handleOptionSelect(option)}
                >
                  <DropdownOptionValue>{option.label}</DropdownOptionValue>
                  {option.value === selected?.value && (
                    <Feather name="check" color="#1163ad" size={24} />
                  )}
                </DropdownOption>
              ))}
            </DropdownOptions>
          ) : (
            <DropdownOptionsEmptyText>
              Nenhum registro encontrado.
            </DropdownOptionsEmptyText>
          )}
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default InputDropdownOld;
