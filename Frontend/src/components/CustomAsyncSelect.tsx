import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';
import { Word } from '../graphql/word/types';

export type SelectOption = { label: string; value: number };

interface SelectAsyncProps {
  name?: string;
  languageId: number;
  selectedValue?: SelectOption;
  handleSelectChange: (SelectOption: SelectOption) => void;
  getData: (languageId: number, searchTerm?: string) => Promise<Word[]>;
}

const CustomAsyncSelect: React.FC<SelectAsyncProps> = ({
  getData,
  selectedValue,
  handleSelectChange,
  languageId,
  name,
}) => {
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

  const onChange = (newValue: SingleValue<SelectOption>) => {
    if (newValue) handleSelectChange(newValue);
  };

  return (
    <div className="customAsync">
      <AsyncSelect
        name={name}
        defaultOptions
        value={selectedValue}
        loadOptions={loadData}
        onChange={onChange}
      />
    </div>
  );
};

export default CustomAsyncSelect;
