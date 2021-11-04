import { useMutation, useQuery } from '@apollo/client';
import { Button } from '@material-ui/core';
import React from 'react';
import CheckboxTable from '../../../components/CheckboxTable';
import { CREATE_SET } from '../../../graphql/set/mutations';
import { GET_ALL_TRANSLATIONS } from '../../../graphql/translation/queries';
import { Translation, Translations } from '../../../graphql/translation/types';
import { useAuth } from '../../../hooks/useAuth';
import { useSettings } from '../../../hooks/useSettings';
import { shuffleArray } from '../../../utils/helperFunctions';
import { TableData, TableHeader } from '../types';

const WordSelection = () => {
  const [tableData, setTableData] = React.useState<TableData[]>([]);
  const translationsPool = React.useRef<Translation[]>([]);
  const [selectedWords, setSelectedWords] = React.useState<number[]>([]);

  const { settings } = useSettings();
  const { currentUser } = useAuth();

  const displayRows = 6;
  const minWords = 20;
  const maxWords = 100;

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
          name: 'amazing',
          createdAt: new Date(),
          translationIds: selectedWords,
        },
      },
    }).then((resp) => resp.data.createSet);
  };

  const mapTranslations = (translations?: Translation[]): TableData[] => {
    return (
      translations?.map((translation: Translation) => ({
        id: translation.id,
        wordFrom: translation.wordFrom.name,
        wordTo: translation.wordTo.name,
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

    translationsPool.current =
      translations.filter((el) => !data.includes(el)) || [];
    setTableData(mapTranslations(data));
  };

  const handleCheckboxChange = (ids: number[]) => {
    setSelectedWords(ids);
  }

  const loadNewData = (translations: Translation[]) => {
    handleSetTableData(
      translations,
      displayRows,
      currentUser?.level?.difficulty || 1
    );
  };

  return (
    <div>
      <CheckboxTable
        tableData={tableData}
        tableHeaders={tableHeaders}
        selectedData={selectedWords}
        handleCheckboxChange={handleCheckboxChange}
      />
      <Button onClick={() => loadNewData(translationsPool.current)}>
        Next
      </Button>
      { <p>{console.log(selectedWords)}a</p>&& <Button onClick={() => createSet()}>createset</Button>}{' '}
    </div>
  );
};

export default WordSelection;
