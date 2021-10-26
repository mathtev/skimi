import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@material-ui/core';
import React from 'react';
import CheckboxTable from '../../../components/CheckboxTable';
import { CREATE_SET } from '../../../graphql/set/mutations';
import { CreateSetRequest } from '../../../graphql/set/types';
import { GET_ALL_TRANSLATIONS } from '../../../graphql/translation/queries';
import { Translation, Translations } from '../../../graphql/translation/types';
import { useSettings } from '../../../hooks/useSettings';
import { shuffleArray } from '../../../utils/helperFunctions';
import { TableData, TableHeader } from '../types';


const WordSelection = () => {
  const [selectedData, setSelectedData] = React.useState<number[]>([]);
  const [tableData, setTableData] = React.useState<TableData[]>([]);
  const translationsPool = React.useRef<Translation[]>([]);
  const selectedWords = React.useRef<number[]>([]);

  const { settings } = useSettings();

  const [createSetMutation] = useMutation(CREATE_SET);
  const translationsQuery = useQuery<Translations>(GET_ALL_TRANSLATIONS, {
    onCompleted: (data) => {
      loadNewData(data.translations);
    },
  });

  const tableHeaders: TableHeader[] = [
    { id: 'wordFrom', label: settings?.nativeLanguage },
    { id: 'wordTo', label: settings?.learningLanguage },
  ];

  const createSet = () => {
    return createSetMutation({
      variables: {
        set: {
          name: 'new set 1',
          created_at: '2021-01-02',
          translation_ids: selectedWords.current,
        },
      },
    }).then((resp) => resp.data.createSet);
  };

  const mapTranslations = (translations?: Translation[]): TableData[] => {
    return (
      translations?.map((translation: Translation) => ({
        id: translation.id,
        wordFrom: translation.word_from.name,
        wordTo: translation.word_to.name,
      })) || []
    );
  };

  const handleSetTableData = (
    translations: Translation[],
    rows: number,
    difficulty: number
  ) => {
    const data =
      shuffleArray(translations)
        .filter((translation) => translation.level.difficulty === difficulty)
        .slice(0, rows) || [];

    translationsPool.current = translations.filter((el) => !data.includes(el)) || [];
    setTableData(mapTranslations(data));
    setSelectedData([]);
  };

  const loadNewData = (translations: Translation[]) => {
    if (selectedData.length) {
      selectedWords.current.push(...selectedData);
    }
    handleSetTableData(translations, 6, 1);
  };

  return (
    <div>
      <CheckboxTable
        tableData={tableData}
        tableHeaders={tableHeaders}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
      <Button onClick={() => loadNewData(translationsPool.current)}>Next</Button>
      <Button onClick={() => createSet()}>createset</Button>
    </div>
  );
};

export default WordSelection;
