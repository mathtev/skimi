import React from 'react'
import CheckboxTable from '../../../../components/CheckboxTable';
import { TableData, TableHeader } from '../../types';

const tableData: TableData[] = [
  { languageFrom: 'be', languageTo: 'sein' },
  { languageFrom: 'learn', languageTo: 'lernen' },
  { languageFrom: 'sleep', languageTo: 'schlafen' },
  { languageFrom: 'cat', languageTo: 'katze' },
  { languageFrom: 'paint', languageTo: 'malen' },
  { languageFrom: 'mum', languageTo: 'mutter' },
  { languageFrom: 'dad', languageTo: 'vater' },
];

const tableHeaders: TableHeader[] = [
  { id: 'languageFrom', label: 'English' },
  { id: 'languageTo', label: 'German' },
];

const WordSelection = () => {
  return (
    <div>
      <CheckboxTable tableData={tableData} tableHeaders={tableHeaders} />
    </div>
  )
}

export default WordSelection
