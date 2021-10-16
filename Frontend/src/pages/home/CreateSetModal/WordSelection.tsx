import { Button } from '@material-ui/core';
import React from 'react';
import CheckboxTable from '../../../components/CheckboxTable';
import { TableData, TableHeader } from '../types';

const tableData: TableData[] = [
  { id: 1, languageFrom: 'be', languageTo: 'sein' },
  { id: 2, languageFrom: 'learn', languageTo: 'lernen' },
  { id: 3, languageFrom: 'sleep', languageTo: 'schlafen' },
  { id: 4, languageFrom: 'cat', languageTo: 'katze' },
  { id: 5, languageFrom: 'paint', languageTo: 'malen' },
  { id: 6, languageFrom: 'mum', languageTo: 'mutter' },
  { id: 7, languageFrom: 'dad', languageTo: 'vater' },
];

const tableHeaders: TableHeader[] = [
  { id: 'languageFrom', label: 'English' },
  { id: 'languageTo', label: 'German' },
];

const WordSelection = () => {
  const [selectedData, setSelectedData] = React.useState<TableData[]>([]);
  // eslint-disable-next-line
  const [selectedWords, setSelectedWords] = React.useState<TableData[]>([]);
  const loadNewData = () => {
    if (selectedData.length) {
      setSelectedWords((prevState) => [...prevState, ...selectedData]);
    }
    
  };
  return (
    <div>
      <CheckboxTable
        tableData={tableData}
        tableHeaders={tableHeaders}
        selectedData={selectedData}
        setSelectedData={setSelectedData}
      />
      <Button onClick={loadNewData}>Next</Button>
    </div>
  );
};

export default WordSelection;
