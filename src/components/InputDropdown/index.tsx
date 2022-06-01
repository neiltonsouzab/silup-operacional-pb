import React, { useEffect, useState, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import ModalSelector, {
  IModalSelectorProps,
  IOption,
} from 'react-native-modal-selector';

import { Container, Label, InputContent, Input } from './styles';

interface InputDropdownProps extends IModalSelectorProps<IOption> {
  label: string;
  modalTitle: string;
}

const InputDropdown: React.FC<InputDropdownProps> = ({
  label,
  modalTitle,
  data,
  onChange,
  selectedKey,
  ...rest
}) => {
  const [optionSelected, setOptionSelected] = useState<IOption>();
  const [options, setOptions] = useState<IOption[]>([]);

  useEffect(() => {
    setOptions([...data]);
  }, [data, modalTitle, selectedKey]);

  useEffect(() => {
    setOptionSelected(data.find((findData) => findData.key === selectedKey));
  }, [selectedKey, data]);

  const handleSelectOption = useCallback(
    (selected: IOption) => {
      onChange && onChange(selected);
    },
    [onChange],
  );

  return (
    <ModalSelector
      {...rest}
      data={options}
      selectedKey={selectedKey}
      cancelText="FECHAR"
      sectionStyle={{
        borderBottomColor: '#eee',
      }}
      sectionTextStyle={{
        fontFamily: 'RopaSans_400Regular',
        fontSize: 16,
        color: '#EB5757',
      }}
      cancelStyle={{
        paddingVertical: 16,
        backgroundColor: '#1163ad',
      }}
      cancelTextStyle={{
        fontFamily: 'RopaSans_400Regular',
        fontSize: 16,
        color: '#fff',
      }}
      optionContainerStyle={{
        maxHeight: 500,
        backgroundColor: '#FFF',
        borderColor: '#FFF',
      }}
      optionStyle={{
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
      }}
      optionTextStyle={{
        fontFamily: 'RopaSans_400Regular',
        fontSize: 16,
        color: '#888',
      }}
      selectedItemTextStyle={{
        color: '#1163ad',
      }}
      onChange={handleSelectOption}
    >
      <Container>
        <Label>{label}</Label>
        <InputContent>
          <Input
            editable={false}
            placeholder="Selecione"
            value={optionSelected && optionSelected.label}
          />
          <Feather name="chevron-down" color="#c4c4c4" size={24} />
        </InputContent>
      </Container>
    </ModalSelector>
  );
};

export default InputDropdown;
