import React, { MutableRefObject } from 'react';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { Word } from '../graphql/word/types';

export type SelectOption = { label: string; value?: number };

interface SelectAsyncProps {
  inputRef?: MutableRefObject<any>;
  name?: string;
  languageId: number;
  selectedValue?: string;
  getData: (languageId: number, searchTerm?: string) => Promise<Word[]>;
  handleSelectChange: (SelectOption: string) => void;
}

const CustomAsyncSelect: React.FC<SelectAsyncProps> = ({
  getData,
  languageId,
  name,
  selectedValue,
  handleSelectChange
}) => {
  const [selected, setSelected] = React.useState<SelectOption | null>();
  const loadData = (match: string) => {
    return getData(languageId, match)
      .then((resp) => {
        return resp?.map((word, idx: number) => ({
          label: word.name,
          value: word.id,
        }));
      })
      .catch((e: Error) => console.error(e.message));
  };

  const onInputChange = (newValue: SingleValue<string>, action: any) => {
    if (action.action === 'input-change') {
      setSelected(null);
      handleSelectChange(newValue || '')
    }
  };

  const onChange = (newValue: SingleValue<SelectOption>) => {
    if (newValue) {
      setSelected(newValue);
      handleSelectChange(newValue.label)
    }
  };

  return (
    <div className="customAsync">
      <AsyncSelect
        name={name}
        defaultOptions
        value={selected}
        inputValue={!selected ? selectedValue : ''}
        loadOptions={loadData}
        onInputChange={onInputChange}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomAsyncSelect;
