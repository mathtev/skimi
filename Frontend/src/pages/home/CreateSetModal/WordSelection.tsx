import { useMutation } from '@apollo/client';
import { Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import CheckboxTable from '../../../components/CheckboxTable';
import { CREATE_SET } from '../../../graphql/set/mutations';
import { Translation } from '../../../graphql/translation/types';
import { useLevels } from '../../../hooks/useLevels';
import { useSettings } from '../../../hooks/useSettings';
import { shuffleArray } from '../../../utils/helperFunctions';
import { TableData, TableHeader } from '../types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    titleInput: {
      marginBottom: 20,
    },
    inputText: {
      fontSize: 16,
    },
  })
);

interface WordSelectionProps {
  displayRows: number;
  minWords: number;
  translations: Translation[];
  handleModalClose: () => void;
}

const WordSelection: React.FC<WordSelectionProps> = ({
  displayRows,
  minWords,
  handleModalClose,
  translations,
}) => {
  const classes = useStyles();
  const { nativeLanguage, foreignLanguage } = useSettings();
  const { levels, userLevel } = useLevels();

  const translationsRef = React.useRef<Translation[]>(translations);
  const prevWordsLen = React.useRef<number>(0);
  const estimatedLevel = React.useRef<number>(userLevel?.difficulty || 1);

  const [tableData, setTableData] = React.useState<TableData[]>([]);
  const [selectedWords, setSelectedWords] = React.useState<number[]>([]);

  const [title, setTitle] = React.useState('New set');
  const [errorMessage, setErrorMessage] = React.useState('');

  const [createSetMutation] = useMutation(CREATE_SET);

  const tableHeaders: TableHeader[] = [
    { id: 'wordFrom', label: nativeLanguage },
    { id: 'wordTo', label: foreignLanguage },
  ];

  React.useEffect(() => {
    handleSetTableData(displayRows, estimatedLevel.current);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validateInput(e.target.value);
    setTitle(e.target.value);
  };

  const validateInput = (value: string) => {
    if (value.trim() === '') {
      setErrorMessage("Title can't be empty");
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const createSet = () => {
    return createSetMutation({
      variables: {
        set: {
          name: title,
          createdAt: new Date(),
          translationIds: selectedWords,
        },
      },
    }).then((resp) => resp.data.createSet);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (errorMessage.trim() !== '') return;
    try {
      await createSet();
    } catch (error) {
      console.error(error);
    }
    handleModalClose();
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

  const handleSetTableData = (rows: number, difficulty: number) => {
    const _translations = translationsRef.current;

    const data =
      shuffleArray(_translations)
        .filter((translation) => translation.level.difficulty === difficulty)
        .slice(0, rows) || [];

    translationsRef.current =
      _translations.filter((el) => !data.includes(el)) || [];

    setTableData(mapTranslations(data));
  };

  const handleCheckboxChange = (ids: number[]) => {
    setSelectedWords(ids);
  };

  const loadNewData = () => {
    handleSetTableData(displayRows, estimatedLevel.current);
    prevWordsLen.current = selectedWords.length;
  };

  const handleNext = () => {
    estimateNewLevel();
    loadNewData();
  };

  const estimateNewLevel = () => {
    let newLevel = estimatedLevel.current;
    const numLevels = levels.length;
    const numChecked = selectedWords.length - prevWordsLen.current;
    const perceent = (numChecked / displayRows) * 100;

    if (perceent > 70) {
      newLevel -= 1;
    } else if (perceent < 30) {
      newLevel += 1;
    }

    if (newLevel > numLevels) {
      newLevel = numLevels;
    } else if (newLevel < 1) {
      newLevel = 1;
    }

    estimatedLevel.current = newLevel;
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        className={classes.titleInput}
        error={errorMessage !== ''}
        helperText={errorMessage}
        InputProps={{
          classes: {
            input: classes.inputText,
          },
        }}
        value={title}
        placeholder="set name"
        onChange={handleChange}
      />
      <CheckboxTable
        minWords={minWords}
        tableData={tableData}
        tableHeaders={tableHeaders}
        selectedData={selectedWords}
        handleCheckboxChange={handleCheckboxChange}
      />
      <div className={classes.buttons}>
        {tableData.length > 0 && <Button onClick={handleNext}>Next</Button>}
        {selectedWords.length >= minWords && (
          <Button variant="contained" type="submit">
            create set
          </Button>
        )}
      </div>
    </form>
  );
};

export default WordSelection;
