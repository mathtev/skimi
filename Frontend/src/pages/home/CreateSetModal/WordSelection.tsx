import { useQuery } from '@apollo/client';
import { Button } from '@material-ui/core';
import React from 'react';
import CheckboxTable from '../../../components/CheckboxTable';
import { GET_ALL_TRANSLATIONS } from '../../../graphql/translation/queries';
import { Translation, Translations } from '../../../graphql/translation/types';
import { useSettings } from '../../../hooks/useSettings';
import { shuffleArray } from '../../../utils/helperFunctions';
import { TableData, TableHeader } from '../types';

// zaladuj translacje z serwera
// ustaw translationsPool
// ustaw w tabelce translacje na losowe setTableTranslations(liczba_wierszy, level)
//// zmień kolejność elementów w translationsPool na losową, shuffle
//// newData = slice(0, liczba_wierszy)
//// usuń newData z translationsPool

const WordSelection = () => {
  const [selectedData, setSelectedData] = React.useState<number[]>([]);
  // eslint-disable-next-line
  const [selectedWords, setSelectedWords] = React.useState<number[]>([]);
  const [tableData, setTableData] = React.useState<TableData[]>([]);
  const [translationsPool, setTranslationsPool] = React.useState<Translation[]>(
    []
  );

  const { settings } = useSettings();

  const tableHeaders: TableHeader[] = [
    { id: 'wordFrom', label: settings?.nativeLanguage },
    { id: 'wordTo', label: settings?.learningLanguage },
  ];

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
    const newTranslations =
      translations.filter((el) => !data.includes(el)) || [];
    setTableData(mapTranslations(data));
    setTranslationsPool(newTranslations);
  };

  const loadNewData = (translations: Translation[]) => {
    if (selectedData.length) {
      setSelectedWords((prevState) => [...prevState, ...selectedData]);
    }
    handleSetTableData(translations, 6, 1);
  };

  const translationsQuery = useQuery<Translations>(GET_ALL_TRANSLATIONS, {
    onCompleted: (data) => {
      loadNewData(data.translations);
    },
  });

  return (
    <div>
      <CheckboxTable
        tableData={tableData}
        tableHeaders={tableHeaders}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
      <Button onClick={() => loadNewData(translationsPool)}>Next</Button>
    </div>
  );
};

export default WordSelection;
